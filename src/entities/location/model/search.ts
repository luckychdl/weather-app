import type { LocationSearchItem } from "./types";

function normalize(text: string) {
  return text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[·.,()-]/g, "");
}

export function searchLocations(
  index: LocationSearchItem[],
  keyword: string,
  limit = 20,
): LocationSearchItem[] {
  const query = normalize(keyword);
  if (!query) return [];

  return index
    .filter((item) => item.searchable.includes(query))
    .slice(0, limit);
}
