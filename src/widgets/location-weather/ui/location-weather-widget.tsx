import { useLocationWeather } from "@/features/location-weather";
import { WeatherSummary, HourlyList } from "@/entities/weather";
import { useFavorites } from "@/features/favorite-location";

type Props = {
  locationId: string;
};

export function LocationWeatherWidget({ locationId }: Props) {
  const { query, geo, weather } = useLocationWeather(locationId);
  const { has, toggle } = useFavorites();
  const isFav = has(locationId);
  return (
    <section className="mx-auto max-w-3xl p-4">
      <div className="flex flex-row items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">{query}</h1>
        <button
          type="button"
          className="text-2xl text-yellow-500 cursor-pointer"
          onClick={() =>
            toggle({
              id: locationId,
              label: query ?? "",
              weather: weather.data,
            })
          }
        >
          {isFav ? "★" : "☆"}
        </button>
      </div>

      {geo.isLoading && (
        <p className="mt-2 text-lg h-[300px] flex items-center justify-center">
          좌표 찾는 중...
        </p>
      )}
      {geo.isError && (
        <p className="mt-2 text-lg text-red-600 h-[300px] flex items-center justify-center">
          해당 장소의 정보가 제공되지 않습니다.
        </p>
      )}

      {!geo.isLoading && !geo.isError && (
        <>
          {weather.isLoading && (
            <p className="mt-2 text-sm">날씨 불러오는 중...</p>
          )}
          {weather.isError && (
            <p className="mt-2 text-sm text-red-600">
              날씨 정보를 불러올 수 없습니다.
            </p>
          )}

          {weather.data && (
            <>
              <WeatherSummary weather={weather.data} />
              <HourlyList hourly={weather.data.hourly} />
            </>
          )}
        </>
      )}
    </section>
  );
}
