import type { WeatherResult } from "@/entities/weather";

export type LocationSearchItem = {
  id: string;
  label: string;
  searchable: string;
};
export type FavoriteLocation = {
  id: string;
  label: string;
  isEditing?: boolean;
  weather?: WeatherResult;
};
