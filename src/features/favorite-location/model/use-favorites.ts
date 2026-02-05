import { useEffect, useState } from "react";
import type { FavoriteLocation } from "@/entities/location";
import {
  allCancelEditFavorite,
  editFavorite,
  getFavorites,
  toggleEditFavorite,
  toggleFavorite,
} from "@/entities/location";

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteLocation[]>([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const has = (id: string) => favorites.some((f) => f.id === id);

  const toggle = (item: FavoriteLocation) => {
    const ok = toggleFavorite(item);
    if (!ok) {
      alert("즐겨찾기는 최대 6개까지 등록할 수 있습니다.");
      return;
    }
    // ✅ localStorage 변경 후 바로 state 갱신 → UI 즉시 반영
    setFavorites(getFavorites());
  };
  const toggleEdit = (item: FavoriteLocation) => {
    toggleEditFavorite(item);
    setFavorites(getFavorites());
  };
  const changeLabel = (item: FavoriteLocation, label: string) => {
    setFavorites((prev) =>
      prev.map((f) => (f.id === item.id ? { ...f, label } : f)),
    );
  };
  const edit = (item: FavoriteLocation, label: string) => {
    editFavorite(item, label);
    setFavorites(getFavorites());
  };
  const allCancel = () => {
    allCancelEditFavorite();
    setFavorites(getFavorites());
  };
  return { favorites, has, toggle, toggleEdit, changeLabel, edit, allCancel };
}
