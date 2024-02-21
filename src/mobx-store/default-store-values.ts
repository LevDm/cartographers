import { AllActionTypes, CoinTypes, AllFrameTypes } from "@/data/types";

import { MAPS } from "@/data/cards";
import { getCurrentDateTime } from "@/game-utils/get-current-date-time";

export const getDefaultScores = () => [...Array(4)].map(() => ({ p1: 0, p2: 0, c: 0, m: 0 }));

export const getDefaultCoinsWallet = () =>
  [...Array(14)].map((_, index) => ({
    id: `coin-${index}`,
    coinType: "none" as CoinTypes,
  }));

export const getMap = (settingMapId: string) => {
  const settingMap = MAPS.find((map) => map.id == settingMapId) ?? MAPS[0];
  return [...Array(121)].map((_, index) => {
    const row = Math.floor(index / 11);
    const col = index - 11 * row;

    const frameID = `${row}-${col}`;
    const mapBuilderFrame = settingMap.params[frameID];

    const frame = {
      frameType: "none" as AllFrameTypes,
      ...mapBuilderFrame,
    };

    return { id: frameID, ...frame };
  });
};
export const getDefaultHistory = () => [
  {
    id: "history-row-0",
    stepMode: "season" as AllActionTypes,
    time: getCurrentDateTime(),
  },
];
