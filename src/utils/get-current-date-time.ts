import { format } from "date-fns";

export function getCurrentDateTime() {
  return format(new Date(), "HH:mm / dd.MM");
}
