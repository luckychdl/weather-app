import type { FavoriteLocation } from "./types";

const KEY = "favorites.locations";
const MAX = 6;

function read(): FavoriteLocation[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as FavoriteLocation[]) : [];
  } catch {
    return [];
  }
}

function write(items: FavoriteLocation[]) {
  localStorage.setItem(KEY, JSON.stringify(items));
}

export function getFavorites() {
  return read();
}

export function isFavorite(id: string) {
  return read().some((x) => x.id === id);
}

export function addFavorite(item: FavoriteLocation) {
  const items = read();
  if (items.some((x) => x.id === item.id)) return true;
  if (items.length >= MAX) return false;
  write([{ ...item, isEditing: false }, ...items]);
  return true;
}

export function removeFavorite(id: string) {
  write(read().filter((x) => x.id !== id));
}
export function toggleFavorite(item: FavoriteLocation) {
  if (isFavorite(item.id)) {
    removeFavorite(item.id);
    return true;
  }
  return addFavorite(item);
}

export function startEditFavorite(item: FavoriteLocation) {
  write(read().map((x) => (x.id === item.id ? { ...x, isEditing: true } : x)));
}
export function cancelEditFavorite(item: FavoriteLocation) {
  write(read().map((x) => (x.id === item.id ? { ...x, isEditing: false } : x)));
}
export function allCancelEditFavorite() {
  write(read().map((x) => ({ ...x, isEditing: false })));
}
export function isEdit(id: string) {
  return read().find((x) => x.id === id)?.isEditing ?? false;
}
export function toggleEditFavorite(item: FavoriteLocation) {
  if (isEdit(item.id)) {
    cancelEditFavorite(item);
    return true;
  }
  return startEditFavorite(item);
}
export function editFavorite(item: FavoriteLocation, label: string) {
  write(
    read().map((x) =>
      x.id === item.id ? { ...item, label, isEditing: false } : x,
    ),
  );
}
