import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { env } from "@/shared/config/env";

type ForecastResponse = {
  list: {
    dt: number;
    main: {
      temp: number;
      temp_min: number;
      temp_max: number;
    };
    weather: { icon: string; description: string }[];
  }[];
};

export function useWeatherByLatLon(lat?: number, lon?: number) {
  return useQuery({
    queryKey: ["weather", lat, lon],
    enabled: !!lat && !!lon,
    queryFn: async () => {
      const res = await axios.get(
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

      const iconUrl = (icon: string) =>
        `https://openweathermap.org/img/wn/${icon}@2x.png`;

      const today = res.data.list.slice(0, 8);
      const firstIcon = today[0].weather?.[0]?.icon;

      return {
        temp: today[0].main.temp,
        min: Math.min(
          ...today.map((v: ForecastResponse["list"][0]) => v.main.temp_min),
        ),
        max: Math.max(
          ...today.map((v: ForecastResponse["list"][0]) => v.main.temp_max),
        ),
        iconUrl: firstIcon ? iconUrl(firstIcon) : undefined,
        hourly: today.map((v: ForecastResponse["list"][0]) => ({
          dt: v.dt,
          temp: v.main.temp,
          iconUrl: v.weather?.[0]?.icon
            ? iconUrl(v.weather[0].icon)
            : undefined,
        })),
      };
    },
  });
}
