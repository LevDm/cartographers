import { AllFrameSubTypes, AllFrameTypes } from "./types";

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
