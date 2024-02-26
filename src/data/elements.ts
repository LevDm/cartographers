import {
  AllFrameTypes,
  CoinKinds,
  RuinKinds,
  AllActionTypes,
  FrameParamsType,
  ScoreValueType,
} from "./types";

import hill from "../../public/element-icons/hill.svg";
import home from "../../public/element-icons/home.svg";
import tree from "../../public/element-icons/tree.svg";
import evil from "../../public/element-icons/evil.svg";
import pond from "../../public/element-icons/pond.svg";
import brim from "../../public/element-icons/brim.svg";

type BasicFrameDataType = {
  title: string;
  bgc: string;
  imgSrc?: string;
  disabled?: boolean;
};
export type BasicFramesType = Record<AllFrameTypes, BasicFrameDataType>;
export const BASIC_FRAMES: BasicFramesType = {
  void: {
    title: "Пустота",
    bgc: "transparent",
    disabled: true,
  },
  hill: {
    title: "Горы",
    bgc: "#F2E8DE",
    imgSrc: hill,
    disabled: true,
  },
  none: {
    title: "Свободно",
    bgc: "#F2EEEC",
  },
  tree: {
    title: "Лес",
    bgc: "#D8E9C6",
    imgSrc: tree,
  },
  home: {
    title: "Поселение",
    bgc: "#F4C7C5",
    imgSrc: home,
  },
  brim: {
    title: "Поля",
    bgc: "#F2E6BD",
    imgSrc: brim,
  },
  pond: {
    title: "Водоём",
    bgc: "#C9E2EB",
    imgSrc: pond,
  },
  evil: {
    title: "Монстры",
    bgc: "#E5CADC",
    imgSrc: evil,
  },
};

import coinNone from "../../public/element-icons/coin-none.svg";
import coinAdded from "../../public/element-icons/coin-added.svg";
import coinLost from "../../public/element-icons/coin-lost.svg";

import ruinNone from "../../public/element-icons/ruin-none.svg";
import ruinAdded from "../../public/element-icons/ruin-added.svg";
import { CounterTypes } from "./cards";

type paramsType = {
  title: string;
  kind: CoinKinds | RuinKinds;
};

export const RUIN_PARAM: paramsType = {
  title: "Руины",
  kind: {
    none: {
      title: "Пропущены",
      imgSrc: ruinNone,
    },
    added: {
      title: "Замечены",
      imgSrc: ruinAdded,
    },
  },
};

export const COIN_PARAM: paramsType = {
  title: "Монета",
  kind: {
    none: {
      title: "Не найдена",
      imgSrc: coinNone,
    },
    added: {
      title: "Добавлена",
      imgSrc: coinAdded,
    },
    lost: {
      title: "Потеряна",
      imgSrc: coinLost,
    },
  },
};

export type ParamsType = Record<FrameParamsType, BasicFrameDataType>;
export const PARAMS: ParamsType = {
  coin: {
    title: COIN_PARAM.title,
    bgc: "#F2EEEC",
    imgSrc: COIN_PARAM.kind.added.imgSrc,
  },
  ruin: {
    title: RUIN_PARAM.title,
    bgc: "#F2EEEC",
    imgSrc: RUIN_PARAM.kind.added.imgSrc,
  },
};

type seasonScoreType = {
  title: string;
  value: ScoreValueType;
  imgScr?: string;
};
const STATIC_SCORES: seasonScoreType[] = [
  { title: "К", value: "c" },
  { title: "М", value: "m" },
];

type seasonsType = {
  title: string;
  description: string;
  score: seasonScoreType[];
};
export const SEASONS: seasonsType[] = [
  {
    title: "Весна",
    description: "Активны А и Б",
    score: [{ title: "A", value: "p1" }, { title: "Б", value: "p2" }, ...STATIC_SCORES],
  },
  {
    title: "Лето",
    description: "Активны Б и В",
    score: [{ title: "Б", value: "p1" }, { title: "В", value: "p2" }, ...STATIC_SCORES],
  },
  {
    title: "Осень",
    description: "Активны В и Г",
    score: [{ title: "В", value: "p1" }, { title: "Г", value: "p2" }, ...STATIC_SCORES],
  },
  {
    title: "Зима",
    description: "Активны А и Г",
    score: [{ title: "A", value: "p1" }, { title: "Г", value: "p2" }, ...STATIC_SCORES],
  },
];

export const seasonCounters: Record<CounterTypes, { title: string; used: number[] }> = {
  green: {
    title: "A",
    used: [0, 3],
  },
  blue: {
    title: "Б",
    used: [0, 1],
  },
  red: {
    title: "В",
    used: [1, 2],
  },
  violet: {
    title: "Г",
    used: [2, 3],
  },
};

export const ACTIONS_TITLES: Record<AllActionTypes, string> = {
  simpl: "Ход",
  skill: "Навык",
  season: "Сезон",
};
