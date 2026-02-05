export type WeatherHourly = {
  dt: number;
  temp: number;
  iconUrl?: string;
};

export type WeatherResult = {
  locationName?: string;
  temp: number;
  min: number;
  max: number;
  hourly: WeatherHourly[];
  iconUrl?: string;
};
