import { MapFramesType } from "./types";

type MapType = {
  id: string;
  params: Record<string, Partial<Omit<MapFramesType, "id">>>;
};
export const MAPS: MapType[] = [
  {
    id: "map-a",
    params: {
      "1-3": { frameType: "hill", coinType: "added" },
      "1-5": { ruinType: "none" },
      "2-1": { ruinType: "none" },
      "2-8": { frameType: "hill", coinType: "added" },
      "2-9": { ruinType: "none" },
      "5-5": { frameType: "hill", coinType: "added" },
      "8-1": { ruinType: "none" },
      "8-2": { frameType: "hill", coinType: "added" },
      "8-9": { ruinType: "none" },
      "9-5": { ruinType: "none" },
      "9-7": { frameType: "hill", coinType: "none" },
    },
  },
  {
    id: "map-b",
    params: {
      "1-6": { ruinType: "none" },
      "1-8": { frameType: "hill", coinType: "added" },

      "2-2": { ruinType: "none" },
      "2-3": { frameType: "hill", coinType: "added" },

      "4-6": { ruinType: "none" },

      "6-1": { ruinType: "none" },

      "7-5": { frameType: "hill", coinType: "added" },
      "7-8": { ruinType: "none" },

      "8-9": { frameType: "hill", coinType: "added" },

      "9-2": { frameType: "hill", coinType: "added" },
      "9-3": { ruinType: "none" },
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

import { StaticImageData } from "next/image";

import gc1 from "../../public/cards/counters/green/gc01.jpg";
import gc2 from "../../public/cards/counters/green/gc02.jpg";
import gc3 from "../../public/cards/counters/green/gc03.jpg";
import gc4 from "../../public/cards/counters/green/gc04.jpg";

import bc1 from "../../public/cards/counters/blue/bc01.jpg";
import bc2 from "../../public/cards/counters/blue/bc02.jpg";
import bc3 from "../../public/cards/counters/blue/bc03.jpg";
import bc4 from "../../public/cards/counters/blue/bc04.jpg";

import rc1 from "../../public/cards/counters/red/rc01.jpg";
import rc2 from "../../public/cards/counters/red/rc02.jpg";
import rc3 from "../../public/cards/counters/red/rc03.jpg";
import rc4 from "../../public/cards/counters/red/rc04.jpg";

import vc1 from "../../public/cards/counters/violet/vc01.jpg";
import vc2 from "../../public/cards/counters/violet/vc02.jpg";
import vc3 from "../../public/cards/counters/violet/vc03.jpg";
import vc4 from "../../public/cards/counters/violet/vc04.jpg";

import {
  Counter,
  green_counter_1,
  green_counter_2,
  green_counter_3,
  green_counter_4,
  blue_counter_1,
  blue_counter_2,
  blue_counter_3,
  blue_counter_4,
  red_counter_1,
  red_counter_2,
  red_counter_3,
  red_counter_4,
  violet_counter_1,
  violet_counter_2,
  violet_counter_3,
  violet_counter_4,
} from "@/utils/score-counter";

export type CounterTypes = "green" | "blue" | "red" | "violet";
type CardCounter = {
  id: string;
  title: string;
  count: Counter;
  imgSrc: StaticImageData;
};
export const CARD_COUNTER: Record<CounterTypes, CardCounter[]> = {
  green: [
    {
      id: "g-counter-1",
      title: "Сторожевой лес",
      count: green_counter_1,
      imgSrc: gc1,
    },
    {
      id: "g-counter-2",
      title: "",
      count: green_counter_2,
      imgSrc: gc2,
    },
    {
      id: "g-counter-3",
      title: "",
      count: green_counter_3,
      imgSrc: gc3,
    },
    {
      id: "g-counter-4",
      title: "",
      count: green_counter_4,
      imgSrc: gc4,
    },
  ],
  blue: [
    {
      id: "b-counter-1",
      title: "",
      count: blue_counter_1,
      imgSrc: bc1,
    },
    {
      id: "b-counter-2",
      title: "",
      count: blue_counter_2,
      imgSrc: bc2,
    },
    {
      id: "b-counter-3",
      title: "",
      count: blue_counter_3,
      imgSrc: bc3,
    },
    {
      id: "b-counter-4",
      title: "",
      count: blue_counter_4,
      imgSrc: bc4,
    },
  ],
  red: [
    {
      id: "r-counter-1",
      title: "",
      count: red_counter_1,
      imgSrc: rc1,
    },
    {
      id: "r-counter-2",
      title: "",
      count: red_counter_2,
      imgSrc: rc2,
    },
    {
      id: "r-counter-3",
      title: "",
      count: red_counter_3,
      imgSrc: rc3,
    },
    {
      id: "r-counter-4",
      title: "",
      count: red_counter_4,
      imgSrc: rc4,
    },
  ],
  violet: [
    {
      id: "v-counter-1",
      title: "",
      count: violet_counter_1,
      imgSrc: vc1,
    },
    {
      id: "v-counter-2",
      title: "",
      count: violet_counter_2,
      imgSrc: vc2,
    },
    {
      id: "v-counter-3",
      title: "",
      count: violet_counter_3,
      imgSrc: vc3,
    },
    {
      id: "v-counter-4",
      title: "",
      count: violet_counter_4,
      imgSrc: vc4,
    },
  ],
};

import s1 from "../../public/cards/skills/s03.jpg";
import s2 from "../../public/cards/skills/s06.jpg";
import s3 from "../../public/cards/skills/s02.jpg";
import s4 from "../../public/cards/skills/s05.jpg";
import s5 from "../../public/cards/skills/s08.jpg";
import s6 from "../../public/cards/skills/s01.jpg";
import s7 from "../../public/cards/skills/s04.jpg";
import s8 from "../../public/cards/skills/s07.jpg";

type CardSkill = {
  id: string;
  title: string;
  cost: number;
  imgSrc: StaticImageData;
};
export const CARD_SKILL: CardSkill[] = [
  {
    id: "skill-1",
    title: "Лечение (...ран)",
    cost: 1,
    imgSrc: s1,
  },
  {
    id: "skill-2",
    title: "Скрытность",
    cost: 0,
    imgSrc: s2,
  },
  {
    id: "skill-3",
    title: "Концентрация",
    cost: 3,
    imgSrc: s3,
  },
  {
    id: "skill-4",
    title: "Познания (Тайные знания)",
    cost: 0,
    imgSrc: s4,
  },
  {
    id: "skill-5",
    title: "Поиск",
    cost: 0,
    imgSrc: s5,
  },
  {
    id: "skill-6",
    title: "Ловкость (Акробатика)",
    cost: 2,
    imgSrc: s6,
  },
  {
    id: "skill-7",
    title: "Дипломатия",
    cost: 1,
    imgSrc: s7,
  },
  {
    id: "skill-8",
    title: "Сделка (переговоры)",
    cost: 1,
    imgSrc: s8,
  },
];
