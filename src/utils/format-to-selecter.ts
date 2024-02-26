import { SelectCardType } from "@/data/types";
import { StaticImageData } from "next/image";

type toSelectType = {
  id: string;
  imgSrc: StaticImageData;
};

interface formatToSelectType {
  defaultItem: {
    id?: string;
    imgSrc: StaticImageData;
    disabled?: boolean;
  };
  storeItems?: toSelectType[];
}

export function formatToSelect(e: formatToSelectType) {
  const { defaultItem, storeItems } = e;

  const result: SelectCardType[] = [
    {
      id: "",
      disabled: true,
      ...defaultItem,
    },
    ...(storeItems?.map((el) => cardToSelect(el)) ?? []),
  ];
  return result;
}

function cardToSelect(e: toSelectType) {
  const { id, imgSrc } = e;
  return { id, imgSrc } as SelectCardType;
}
