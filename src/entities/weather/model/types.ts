export type WeatherHourly = {
  dt: number; // unix seconds
  temp: number; // celsius
};

export type WeatherResult = {
  locationName?: string; // 선택(지금은 비워도 됨)
  temp: number;
  min: number;
  max: number;
  hourly: WeatherHourly[];
};
