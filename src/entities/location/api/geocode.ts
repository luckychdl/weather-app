import axios from "axios";
import { env } from "@/shared/config/env";

type GeoItem = {
  lat: number;
  lon: number;
};

export async function geocodeLocation(query: string) {
  console.log(query, "query");
  const res = await axios.get<GeoItem[]>(
    "https://api.openweathermap.org/geo/1.0/direct",
    {
      params: {
        q: query.replaceAll(" ", ", "),
        limit: 1,
        appid: env.OPENWEATHER_API_KEY,
        country: "KR",
        lang: "kr",
      },
    },
  );

  const first = res.data[0];
  if (!first) throw new Error("좌표를 찾을 수 없습니다.");

  return { lat: first.lat, lon: first.lon };
}
