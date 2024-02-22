import { AllActionTypes } from "@/data/types";

export interface actionBarHandlerType {
  action: AllActionTypes;
  value: string;
}

export type ActionBarPropsType = {
  actionBarHandler: (e: actionBarHandlerType) => unknown;
};
