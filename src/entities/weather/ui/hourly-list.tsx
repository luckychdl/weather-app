import type { WeatherHourly } from "@/entities/weather";

type Props = {
  hourly: WeatherHourly[];
};

export function HourlyList({ hourly }: Props) {
  return (
    <div className="mt-3">
      <h3 className="text-lg font-semibold">시간대별 기온</h3>

      <ul className="mt-2 grid grid-cols-2 gap-2">
        {hourly.map((item) => (
          <li
            key={item.dt}
            className="rounded border py-2 px-4 text-sm flex flex-row items-center justify-between"
          >
            <div>
              <div className="text-gray-500">
                {new Date(item.dt * 1000).toLocaleTimeString("ko-KR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
              <div>{Math.round(item.temp)}°C</div>
            </div>
            {item.iconUrl && (
              <img
                src={item.iconUrl}
                alt="weather icon"
                className="w-14 h-14"
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
