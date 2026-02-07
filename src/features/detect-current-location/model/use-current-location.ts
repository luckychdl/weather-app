import { useEffect, useRef, useState } from "react";

type Coords = { lat: number; lon: number };
type Status = "idle" | "loading" | "success" | "error";

const KEY = "last.coords";

function readCache(): Coords | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Coords) : null;
  } catch {
    return null;
  }
}

function writeCache(coords: Coords) {
  localStorage.setItem(KEY, JSON.stringify(coords));
}

export function useCurrentLocation(auto = true) {
  const cached = readCache();

  const [status, setStatus] = useState<Status>(cached ? "success" : "idle");
  const [coords, setCoords] = useState<Coords | null>(cached);
  const [error, setError] = useState<string | null>(null);

  const requestedRef = useRef(false);

  const request = () => {
    if (!navigator.geolocation) {
      setStatus("error");
      setError("위치 기능을 지원하지 않습니다.");
      return;
    }

    setStatus("loading");
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const next = { lat: pos.coords.latitude, lon: pos.coords.longitude };
        setCoords(next);
        writeCache(next);
        setStatus("success");
      },
      () => {
        setStatus("error");
        setError("위치 정보를 가져올 수 없습니다.");
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 },
    );
  };

  useEffect(() => {
    if (!auto) return;
    if (cached) return;
    if (requestedRef.current) return;
    requestedRef.current = true;
    request();
  }, [auto]);

  return { status, coords, error, request };
}
