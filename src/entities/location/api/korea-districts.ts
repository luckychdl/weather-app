import raw from "@/shared/assets/korea_districts.json";
import type { LocationSearchItem } from "../model/types";

const data = raw as string[];

export const locationIndex: LocationSearchItem[] = data.map((item) => {
  const parts = item.split("-");
  const label = parts.join(" ");

  return {
    id: item,
    label,
    searchable: label,
  };
});
