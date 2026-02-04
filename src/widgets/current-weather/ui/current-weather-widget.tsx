import { useCurrentLocation } from "@/features/detect-current-location";
import { useWeatherByLatLon } from "@/entities/weather";
import { HourlyList } from "./hourly-list";

export function CurrentWeatherWidget() {
  const { status, coords } = useCurrentLocation();
  const weather = useWeatherByLatLon(coords?.lat, coords?.lon);

  return (
    <section className="mx-auto max-w-3xl p-4">
      <h1 className="text-2xl font-bold">현재 위치 날씨</h1>

      {/* 위치 */}
      <div className="mt-4 rounded border p-4 text-sm">
        {status === "loading" && <p>현재 위치를 가져오는 중입니다.</p>}
        {status === "error" && (
          <p className="text-red-600">위치 정보를 가져올 수 없습니다.</p>
        )}
      </div>

      {/* 날씨 */}
      <div className="mt-4 rounded border p-4">
        <h2 className="text-lg font-semibold">날씨 정보</h2>

        {weather.isLoading && (
          <p className="mt-2 text-sm">날씨 불러오는 중...</p>
        )}

        {weather.isError && (
          <p className="mt-2 text-sm text-red-600">
            날씨 정보를 불러올 수 없습니다.
          </p>
        )}

        {weather.data && (
          <div className="mt-3 space-y-2 text-sm">
            <div>현재 기온: {Math.round(weather.data.temp)}°C</div>
            <div>최저 기온: {Math.round(weather.data.min)}°C</div>
            <div>최고 기온: {Math.round(weather.data.max)}°C</div>

            <HourlyList hourly={weather.data.hourly} />
          </div>
        )}
      </div>
    </section>
  );
}
