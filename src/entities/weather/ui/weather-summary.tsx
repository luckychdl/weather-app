import type { WeatherResult } from "../model/types";
type Props = {
  weather: WeatherResult;
};
export function WeatherSummary({ weather }: Props) {
  return (
    <>
      <div className="flex w-full border gap-x-16 py-2 px-4 rounded-lg justify-center mt-2">
        {weather.iconUrl && (
          <img src={weather.iconUrl} alt="weather icon" className="w-14 h-14" />
        )}
        <div className="flex flex-col items-center justify-center">
          <p className="text-md">현재 기온</p>
          <p className="text-center">{Math.round(weather.temp)}°C</p>
        </div>

        <div className="flex flex-col items-center justify-center">
          <p>최저 기온</p>
          <p className="text-center">{Math.round(weather.min)}°C</p>
        </div>

        <div className="flex flex-col items-center justify-center">
          <p>최고 기온</p>
          <p className="text-center">{Math.round(weather.max)}°C</p>
        </div>
      </div>
    </>
  );
}
