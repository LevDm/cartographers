import { observable, action, computed, IObservableArray, IObservableValue, toJS } from "mobx";

import {
  CoinWalletType,
  GameStateType,
  AllActionTypes,
  MapFramesType,
  HistoryRowType,
  SeasonScoresType,
  CoinTypes,
  AllFrameTypes,
  GameConfig,
} from "@/data/types";

import { CARD_SKILL, MAPS } from "@/data/cards";
import { getCurrentDateTime } from "@/utils/get-current-date-time";
import { mapFramesCompare, countScores } from "@/utils";

import { getDefaultScores, getDefaultCoinsWallet, getMap } from "./default-store-values";
import { mapCountig } from "@/utils";
import { isNull, isUndefined } from "lodash";

export interface stepHandlerType {
  stepMode: AllActionTypes;
  stepValue: string;
  newMapFrames: MapFramesType[];
  ruin: boolean;
  coins: number;
}

type StorageData = {
  lastSave: string | Date;

  gameConfig: GameConfig;
  season: number;
  freeSkills: number;
  scores: SeasonScoresType[];
  coinsWallet: CoinWalletType[];
  mapFrames: MapFramesType[];
  history: HistoryRowType[];
};

type ScoresType = { p1: number; p2: number; m: number };

class GameStateStore {
  readonly storeName: string = "GameStateStore";
  //store state
  loadSuccses: IObservableValue<boolean> = observable.box(false);
  lastSave: IObservableValue<(string | Date) | null> = observable.box(null);
  //game state
  gameConfig: IObservableValue<GameConfig | null> = observable.box(null);
  season: IObservableValue<number> = observable.box(0);
  freeSkills: IObservableValue<number> = observable.box(1);
  scores: IObservableArray<SeasonScoresType> = observable.array(getDefaultScores());
  coinsWallet: IObservableArray<CoinWalletType> = observable.array(getDefaultCoinsWallet());
  mapFrames: IObservableArray<MapFramesType> = observable.array(getMap("map-a"));
  history: IObservableArray<HistoryRowType> = observable.array([]);

  scoresResults = computed(() => {
    return this.scores.map((el) => countScores(el));
  });

  constructor() {
    this.loadStore();
  }

  //
  startGame = action((config: GameConfig) => {
    this.mapFrames.replace(getMap(config.MapId));

    this.gameConfig.set(config);

    this.addToHistory({ stepMode: "season" });
  });

  addToHistory = action((row: Omit<HistoryRowType, "id" | "time">) => {
    const newRow = {
      id: `history-row-${this.history.length}`,
      time: getCurrentDateTime(),
      ...row,
    };
    this.history.unshift(newRow);

    this.saveStore();
  });

  switchToNewSeason = action(() => {
    this.season.set(Math.min(this.season.get() + 1, 3));
    this.freeSkills.set(Math.max(this.freeSkills.get(), 1));
    this.scores[this.season.get()].c = this.coinsWallet.filter(
      (el) => el.coinType == "added"
    ).length;
    this.addToHistory({ stepMode: "season" });
  });

  walletHandler = action((coins: number) => {
    const newWallet = [...this.coinsWallet];

    const targetCoinType = coins > 0 ? "none" : "added";
    const settingCoinType = coins > 0 ? "added" : "lost";

    for (let i = 0; i < Math.abs(coins); i++) {
      const index = newWallet.findIndex((el) => el.coinType == targetCoinType);
      if (index >= 0) newWallet[index] = { ...newWallet[index], coinType: settingCoinType };
    }

    this.coinsWallet.replace(newWallet);

    this.scores[this.season.get()].c = newWallet.filter((el) => el.coinType == "added").length;
  });

  updateScores = action((scores: ScoresType, season: number) => {
    this.scores[season] = { ...this.scores[season], ...scores };
  });

  setMapFrames = action((mapValue: MapFramesType[]) => {
    if (isNull(this.gameConfig.get())) return;

    const curSeason = this.season.get();

    const { p1, p2, m, c } = mapCountig(mapValue, curSeason, this.gameConfig.get() as GameConfig);
    const newMap = [...mapValue];

    let coins = 0;
    c.map((id) => {
      const index = newMap.findIndex((frame) => frame.id == id && !isUndefined(frame.coinType));
      if (index >= 0) {
        const newItem = { ...newMap[index] };
        delete newItem.coinType;
        newMap[index] = newItem;
        coins += 1;
      }
    });

    this.mapFrames.replace(newMap);

    this.updateScores({ p1, p2, m }, curSeason);

    const framesCompare = mapFramesCompare(this.mapFrames, mapValue);

    return { compare: framesCompare, coins: coins };
  });

  usedSkillHandler = action((idSkill: string) => {
    const cost = CARD_SKILL.find((el) => el.id == idSkill)?.cost ?? 0;
    if (cost > 0) this.walletHandler(-cost);
    this.freeSkills.set(0);
    return cost;
  });

  stepHandler = (e: stepHandlerType) => {
    const { stepMode, stepValue, newMapFrames, ruin, coins } = e;

    const updateResult = this.setMapFrames(newMapFrames);

    if (isUndefined(updateResult)) return;

    const { compare, coins: mapCoins } = updateResult;

    const newCoins = mapCoins + coins;

    const skillCost = stepMode == "skill" && stepValue != "" ? this.usedSkillHandler(stepValue) : 0;

    if (newCoins > 0) this.walletHandler(newCoins);

    const rowHistory = {
      stepMode: stepMode,
      coins: newCoins - skillCost,
      ruin: ruin,
      oldFrames: compare.oldFrames,
      newFrames: compare.newFrames,
    };

    this.addToHistory(rowHistory);
  };

  loadStore = action(() => {
    try {
      const load = localStorage.getItem(this.storeName);
      //console.log(load);
      if (load != null) {
        const {
          lastSave,

          gameConfig,
          season,
          freeSkills,
          scores,
          coinsWallet,
          mapFrames,
          history,
        }: StorageData = JSON.parse(load);

        this.lastSave.set(lastSave);

        this.gameConfig.set(gameConfig);
        this.season.set(season);
        this.freeSkills.set(freeSkills);
        this.scores.replace(scores);
        this.coinsWallet.replace(coinsWallet);
        this.mapFrames.replace(mapFrames);
        this.history.replace(history);
      }

      this.loadSuccses.set(true);
    } catch (e) {
      console.error(e);
    }
  });

  saveStore = action(() => {
    try {
      const saveTime = new Date();
      this.lastSave.set(saveTime);
      const savedData: StorageData = {
        lastSave: saveTime,
        gameConfig: this.gameConfig.get() as GameConfig,
        season: this.season.get(),
        freeSkills: this.freeSkills.get(),
        scores: toJS(this.scores),
        coinsWallet: toJS(this.coinsWallet),
        mapFrames: toJS(this.mapFrames),
        history: toJS(this.history),
      };
      localStorage.setItem(this.storeName, JSON.stringify(savedData));
    } catch (e) {
      console.error(e);
    }
  });

  resetStore = () => {
    localStorage.removeItem(this.storeName);
  };
}

const gameStateStore = new GameStateStore();

export default gameStateStore;
