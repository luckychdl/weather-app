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
): LocationSearchItem[] {
  const query = normalize(keyword);
  if (!query) return [];

  return index.filter((item) => normalize(item.searchable).includes(query));
}
