import { useState } from "react";
import { locationIndex, searchLocations } from "@/entities/location";

export function useLocationSearch() {
  const [keyword, setKeyword] = useState("");

  const trimmed = keyword.trim();

  const results = trimmed ? searchLocations(locationIndex, trimmed, 20) : [];

  return {
    keyword,
    setKeyword,
    results,
  };
}
