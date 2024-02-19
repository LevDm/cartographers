import { formatToSelect } from "@/game-utils";
import { SelectCardType } from "./types";
import { CARD_COUNTER, CARD_SKILL } from "./cards";

import mapA from "../../public/cards/maps/map-a.jpg";
import mapB from "../../public/cards/maps/map-b.jpg";

import gc0 from "../../public/cards/counters/green/gc0.jpg";
import bc0 from "../../public/cards/counters/blue/bc0.jpg";
import rc0 from "../../public/cards/counters/red/rc0.jpg";
import vc0 from "../../public/cards/counters/violet/vc0.jpg";

import s0 from "../../public/cards/skills/s0.jpg";

export const MAPS_IMG: SelectCardType[] = [
  {
    id: "map-a",
    imgSrc: mapA,
  },
  {
    id: "map-b",
    imgSrc: mapB,
  },
];

const GREEN_COUNTERS_IMG: SelectCardType[] = formatToSelect({
  defaultItem: { imgSrc: gc0 },
  storeItems: CARD_COUNTER.green,
});

const BLUE_COUNTERS_IMG: SelectCardType[] = formatToSelect({
  defaultItem: { imgSrc: bc0 },
  storeItems: CARD_COUNTER.blue,
});

const RED_COUNTERS_IMG: SelectCardType[] = formatToSelect({
  defaultItem: { imgSrc: rc0 },
  storeItems: CARD_COUNTER.red,
});

const VIOLET_COUNTERS_IMG: SelectCardType[] = formatToSelect({
  defaultItem: { imgSrc: vc0 },
  storeItems: CARD_COUNTER.violet,
});

const SKILLS_IMG: SelectCardType[] = formatToSelect({
  defaultItem: { imgSrc: s0 },
  storeItems: CARD_SKILL,
});

export const COUNTERS = {
  base: {
    id: "counter",
    title: "Счетчик",
    selectID: "game-start-counter",
  },
  data: [
    { id: "a", title: "А", cards: GREEN_COUNTERS_IMG },
    { id: "b", title: "Б", cards: BLUE_COUNTERS_IMG },
    { id: "c", title: "В", cards: RED_COUNTERS_IMG },
    { id: "d", title: "Г", cards: VIOLET_COUNTERS_IMG },
  ],
};

export const SKILLS = {
  base: {
    id: "skill",
    title: "Навык",
    selectID: "game-start-skill",
  },
  data: [
    { id: "1", title: "1", cards: SKILLS_IMG },
    { id: "2", title: "2", cards: SKILLS_IMG },
    { id: "3", title: "3", cards: SKILLS_IMG },
  ],
};

export const START_GAME_CARDS = [COUNTERS, SKILLS];
