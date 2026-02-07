import type { FavoriteLocation } from "@/entities/location";
import { useWeatherByLatLon, WeatherSummary } from "@/entities/weather";

type Props = {
  favorite: FavoriteLocation;
};

export function FavoriteCardWeather({ favorite }: Props) {
  const weather = useWeatherByLatLon(favorite.lat, favorite.lon);

  if (weather.isLoading) {
    return <p className="text-xs text-gray-500">날씨 불러오는 중...</p>;
  }

  if (weather.isError || !weather.data) {
    return <p className="text-xs text-red-500">날씨 불러오기 실패</p>;
  }

  return <WeatherSummary weather={weather.data} />;
}
