import { useEffect, useState } from "react";

type Coords = {
  lat: number;
  lon: number;
};

type Status = "loading" | "success" | "error";

export function useCurrentLocation() {
  // ✅ 동기 판단은 effect 밖에서
  const isSupported =
    typeof navigator !== "undefined" && !!navigator.geolocation;
  // ✅ 초기 상태로 분기
  const [status, setStatus] = useState<Status>(
    isSupported ? "loading" : "error",
  );
  const [coords, setCoords] = useState<Coords | null>(null);

  useEffect(() => {
    if (!isSupported) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        console.log(pos, "pos");
        setCoords({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
        setStatus("success");
      },
      () => {
        setStatus("error");
      },
    );
  }, [isSupported]);

  return { status, coords };
}
