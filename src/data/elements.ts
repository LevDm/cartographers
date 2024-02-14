import { AllFrameTypes, AllFrameSubTypes, CoinTypes, AllActionTypes } from "./types";

type basicFrameType = {
  title: string;
  bgc: string;
  imgSrc: string;
  disabled?: boolean;
};

export const BASIC_FRAMES: Record<AllFrameTypes | string, basicFrameType> = {
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

export type CoinKinds = Record<CoinTypes, { title: string; imgSrc: string }>;

type RuinTypes = "none" | "added";
type RuinKinds = Record<RuinTypes, { title: string; imgSrc: string }>;

type subFrameType = {
  title: string;
  kind: CoinKinds | RuinKinds;
};

export const SUB_FRAMES: Record<AllFrameSubTypes | string, subFrameType> = {
  coin: {
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
  },
  ruin: {
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
  },
};

type seasonScoreType = {
  title: string;
  imgScr?: string;
};

type seasonsType = {
  title: string;
  description: string;
  score: seasonScoreType[];
};

const STATIC_SCORES: seasonScoreType[] = [{ title: "К" }, { title: "М" }];

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

export const MAPS = {};

export const CARD_COUNTER = {};

export const CARD_MONSTER = {};
