import { AllFrameTypes, CoinKinds, RuinKinds, AllActionTypes, FrameParamsType } from "./types";

type BasicFrameDataType = {
  title: string;
  bgc: string;
  imgSrc: string;
  disabled?: boolean;
};

export type BasicFramesType = Record<AllFrameTypes, BasicFrameDataType>;
export const BASIC_FRAMES: BasicFramesType = {
  void: {
    title: "Пустота",
    bgc: "transparent",
    imgSrc: "0",
    disabled: true,
  },
  hill: {
    title: "Горы",
    bgc: "brown",
    imgSrc: "1",
    disabled: true,
  },
  none: {
    title: "Свободно",
    bgc: "white",
    imgSrc: "2",
  },
  tree: {
    title: "Лес",
    bgc: "green",
    imgSrc: "3",
  },
  home: {
    title: "Поселение",
    bgc: "red",
    imgSrc: "4",
  },
  brim: {
    title: "Поля",
    bgc: "yellow",
    imgSrc: "5",
  },
  pond: {
    title: "Водоём",
    bgc: "blue",
    imgSrc: "6",
  },
  evil: {
    title: "Монстры",
    bgc: "pink",
    imgSrc: "7",
  },
};

type paramsType = {
  title: string;
  kind: CoinKinds | RuinKinds;
};

export const RUIN_PARAM: paramsType = {
  title: "Руины",
  kind: {
    none: {
      title: "Пропущены",
      imgSrc: "0",
    },
    added: {
      title: "Замечены",
      imgSrc: "1",
    },
  },
};

export const COIN_PARAM: paramsType = {
  title: "Монета",
  kind: {
    none: {
      title: "Не найдена",
      imgSrc: "0",
    },
    added: {
      title: "Добавлена",
      imgSrc: "1",
    },
    lost: {
      title: "Потеряна",
      imgSrc: "2",
    },
  },
};

export type ParamsType = Record<FrameParamsType, BasicFrameDataType>;
export const PARAMS: ParamsType = {
  coin: {
    title: COIN_PARAM.title,
    bgc: "orange",
    imgSrc: COIN_PARAM.kind.none.imgSrc,
  },
  ruin: {
    title: RUIN_PARAM.title,
    bgc: "lightgreen",
    imgSrc: RUIN_PARAM.kind.none.imgSrc,
  },
};

type seasonScoreType = {
  title: string;
  imgScr?: string;
};
const STATIC_SCORES: seasonScoreType[] = [{ title: "К" }, { title: "М" }];

type seasonsType = {
  title: string;
  description: string;
  score: seasonScoreType[];
};
export const SEASONS: seasonsType[] = [
  {
    title: "Весна",
    description: "Активны А и Б",
    score: [{ title: "A" }, { title: "Б" }, ...STATIC_SCORES],
  },
  {
    title: "Лето",
    description: "Активны Б и В",
    score: [{ title: "Б" }, { title: "В" }, ...STATIC_SCORES],
  },
  {
    title: "Осень",
    description: "Активны В и Г",
    score: [{ title: "В" }, { title: "Г" }, ...STATIC_SCORES],
  },
  {
    title: "Зима",
    description: "Активны А и Г",
    score: [{ title: "A" }, { title: "Г" }, ...STATIC_SCORES],
  },
];

export const ACTIONS_TITLES: Record<AllActionTypes, string> = {
  simpl: "Ход",
  skill: "Навык",
  season: "Сезон",
};
