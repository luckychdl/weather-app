import { useQuery } from "@tanstack/react-query";
import { geocodeLocation } from "@/entities/location";
import { useWeatherByLatLon } from "@/entities/weather";

function toQueryString(locationId: string) {
  return locationId.split("-").join(" ");
}

export function useLocationWeather(locationId: string) {
  const query = toQueryString(locationId);

  const geo = useQuery({
    queryKey: ["geo", query],
    enabled: !!query,
    queryFn: () => geocodeLocation(query),
  });
  const weather = useWeatherByLatLon(geo.data?.lat, geo.data?.lon);

  return { query, geo, weather };
}
