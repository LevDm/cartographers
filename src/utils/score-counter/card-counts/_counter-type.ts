import { MapFramesType } from "@/data/types";
import { FilltredMapType } from "../handlers/map-filter";

export type Counter = (filltredMap: FilltredMapType, sourceMap: MapFramesType[]) => number;

export type CounterCoin = (filltredMap: FilltredMapType, sourceMap: MapFramesType[]) => string[];
