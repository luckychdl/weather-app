import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { env } from "@/shared/config/env";
import type { WeatherResult } from "../model/types";

type ForecastResponse = {
  list: {
    dt: number;
    main: {
      temp: number;
      temp_min: number;
      temp_max: number;
    };
  }[];
};

export function useWeatherByLatLon(lat?: number, lon?: number) {
  return useQuery({
    queryKey: ["weather", lat, lon],
    enabled: !!lat && !!lon,
    queryFn: async (): Promise<WeatherResult> => {
      const res = await axios.get<ForecastResponse>(
        "https://api.openweathermap.org/data/2.5/forecast",
        {
          params: {
            lat,
            lon,
            appid: env.OPENWEATHER_API_KEY,
            units: "metric",
          },
        },
      );

      const today = res.data.list.slice(0, 8);

      return {
        temp: today[0].main.temp,
        min: Math.min(...today.map((v) => v.main.temp_min)),
        max: Math.max(...today.map((v) => v.main.temp_max)),
        hourly: today.map((v) => ({
          dt: v.dt,
          temp: v.main.temp,
        })),
      };
    },
  });
}
