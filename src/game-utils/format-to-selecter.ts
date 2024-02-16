import { CardType } from "@/components/card-selector/card-selector";
import { StaticImageData } from "next/image";

interface toSelectType {
  id: string;
  imgSrc: StaticImageData;
}
export function toSelect(e: toSelectType) {
  const { id, imgSrc } = e;
  return {
    value: id,
    src: imgSrc,
  } as CardType;
}
