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

type MapType = {
  id: string;
  params: Record<string, { frameType?: AllFrameTypes; subFrameType?: AllFrameSubTypes }>;
};
export const MAPS: MapType[] = [
  {
    id: "map-a",
    params: {
      "1-3": { frameType: "hill", subFrameType: "coin" },
      "1-5": { subFrameType: "ruin" },
      "2-1": { subFrameType: "ruin" },
      "2-8": { frameType: "hill", subFrameType: "coin" },
      "2-9": { subFrameType: "ruin" },
      "5-5": { frameType: "hill", subFrameType: "coin" },
      "8-1": { subFrameType: "ruin" },
      "8-2": { frameType: "hill", subFrameType: "coin" },
      "8-9": { subFrameType: "ruin" },
      "10-5": { subFrameType: "ruin" },
      "10-7": { frameType: "hill", subFrameType: "coin" },
    },
  },
  {
    id: "map-b",
    params: {
      "1-6": { subFrameType: "ruin" },
      "1-8": { frameType: "hill", subFrameType: "coin" },

      "2-2": { subFrameType: "ruin" },
      "2-3": { frameType: "hill", subFrameType: "coin" },

      "4-6": { subFrameType: "ruin" },

      "6-1": { subFrameType: "ruin" },

      "7-5": { frameType: "hill", subFrameType: "coin" },
      "7-8": { subFrameType: "ruin" },

      "8-9": { frameType: "hill", subFrameType: "coin" },

      "9-2": { frameType: "hill", subFrameType: "coin" },
      "9-3": { subFrameType: "ruin" },
      //
      "3-5": { frameType: "void" },
      "4-4": { frameType: "void" },
      "4-5": { frameType: "void" },
      "5-4": { frameType: "void" },
      "5-5": { frameType: "void" },
      "5-6": { frameType: "void" },
      "6-5": { frameType: "void" },
    },
  },
];

type CounterTypes = "green" | "blue" | "red" | "violet";

type CardCounter = {
  id: string;
  title: string;
  counter?: () => unknown;
  imgSrc: string;
};
export const CARD_COUNTER: Record<CounterTypes, CardCounter[]> = {
  green: [
    {
      id: "g-counter-1",
      title: "Сторожевой лес",
      imgSrc: "g1",
    },
    {
      id: "g-counter-2",
      title: "",
      imgSrc: "g2",
    },
    {
      id: "g-counter-3",
      title: "",
      imgSrc: "g3",
    },
    {
      id: "g-counter-4",
      title: "",
      imgSrc: "g4",
    },
  ],
  blue: [
    {
      id: "b-counter-1",
      title: "",
      imgSrc: "b1",
    },
    {
      id: "b-counter-2",
      title: "",
      imgSrc: "b2",
    },
    {
      id: "b-counter-3",
      title: "",
      imgSrc: "b3",
    },
    {
      id: "b-counter-4",
      title: "",
      imgSrc: "b4",
    },
  ],
  red: [
    {
      id: "r-counter-1",
      title: "",
      imgSrc: "1r",
    },
    {
      id: "r-counter-2",
      title: "",
      imgSrc: "2r",
    },
    {
      id: "r-counter-3",
      title: "",
      imgSrc: "3r",
    },
    {
      id: "r-counter-4",
      title: "",
      imgSrc: "4r",
    },
  ],
  violet: [
    {
      id: "v-counter-1",
      title: "",
      imgSrc: "1v",
    },
    {
      id: "v-counter-2",
      title: "",
      imgSrc: "2v",
    },
    {
      id: "v-counter-3",
      title: "",
      imgSrc: "3v",
    },
    {
      id: "v-counter-4",
      title: "",
      imgSrc: "4v",
    },
  ],
};

type CardSkill = {
  id: string;
  title: string;
  cost: number;
  imgSrc: string;
};
export const CARD_SKILL: CardSkill[] = [
  {
    id: "skill-1",
    title: "Лечение (...ран)",
    cost: 1,
    imgSrc: "1",
  },
  {
    id: "skill-2",
    title: "Скрытность",
    cost: 0,
    imgSrc: "2",
  },
  {
    id: "skill-3",
    title: "Концентрация",
    cost: 3,
    imgSrc: "3",
  },
  {
    id: "skill-4",
    title: "Познания (Тайные знания)",
    cost: 0,
    imgSrc: "4",
  },
  {
    id: "skill-5",
    title: "Поиск",
    cost: 0,
    imgSrc: "5",
  },
  {
    id: "skill-6",
    title: "Ловкость",
    cost: 2,
    imgSrc: "6",
  },
  {
    id: "skill-7",
    title: "Дипломатия",
    cost: 1,
    imgSrc: "7",
  },
  {
    id: "skill-8",
    title: "Сделка (переговоры)",
    cost: 1,
    imgSrc: "8",
  },
];
