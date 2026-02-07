import { useCurrentLocation } from "@/features/detect-current-location";
import { useWeatherByLatLon } from "@/entities/weather";

import { HourlyList, WeatherSummary } from "@/entities/weather";

export function CurrentWeatherWidget() {
  const { status, coords, request } = useCurrentLocation();
  const weather = useWeatherByLatLon(coords?.lat, coords?.lon);

  return (
    <section className="mx-auto max-w-3xl p-4">
      <h1 className="text-2xl font-bold">현재 위치 날씨</h1>

      <div className="mt-4 rounded  p-4 text-sm">
        {status === "loading" && <p>현재 위치를 가져오는 중입니다.</p>}
        {status === "error" && (
          <div className="flex flex-row items-center justify-between">
            <p className="text-red-600">위치 정보를 가져올 수 없습니다.</p>
            <button
              type="button"
              onClick={request}
              className="w-fit rounded-md border px-3 py-1 text-sm"
            >
              다시 시도
            </button>
          </div>
        )}
      </div>

      <div className="mt-4 rounded  ">
        <h2 className="text-lg font-semibold">날씨 정보</h2>

        {weather.isLoading && (
          <p className="mt-2 text-sm">날씨 불러오는 중...</p>
        )}

        {weather.isError && (
          <p className="mt-2 text-sm text-red-600">
            날씨 정보를 불러올 수 없습니다.
          </p>
        )}

        {weather.data && <WeatherSummary weather={weather.data} />}
        {weather.data && <HourlyList hourly={weather.data.hourly} />}
      </div>
    </section>
  );
}
