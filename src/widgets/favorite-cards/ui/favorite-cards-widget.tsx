import { useFavorites } from "@/features/favorite-location";
import { useNavigate } from "react-router-dom";
import { routes } from "@/shared/config";
import { FavoriteCardWeather } from "./favorite-card";

export function FavoriteCardsWidgets() {
  const navigate = useNavigate();
  const { favorites, toggle, toggleEdit, changeLabel, edit, allCancel } =
    useFavorites();

  if (favorites.length === 0) return null;

  return (
    <>
      {favorites.length > 0 && (
        <div className="mx-auto max-w-3xl p-4">
          <span className="text-lg font-semibold">즐겨찾기</span>

          <div className="mt-4 flex gap-4 overflow-x-auto flex-nowrap pb-2">
            {favorites.map((favorite) => (
              <button
                key={favorite.id}
                type="button"
                onClick={() => {
                  allCancel();
                  navigate(routes.detail(favorite.id));
                }}
                className="min-h-[100px] min-w-fit cursor-pointer rounded-md border p-2 text-sm"
              >
                <div className="flex w-full items-center justify-between">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggle(favorite);
                    }}
                    className="text-2xl text-yellow-500"
                  >
                    ★
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleEdit(favorite);
                    }}
                  >
                    편집
                  </button>
                </div>

                {favorite.isEditing ? (
                  <div
                    className="mt-2 flex w-full items-center gap-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      className="w-full rounded-md border p-2"
                      value={favorite.label}
                      onChange={(e) => changeLabel(favorite, e.target.value)}
                      onKeyUp={(e) => {
                        if (e.key === "Enter") edit(favorite, favorite.label);
                      }}
                    />
                    <div className="flex gap-2 min-w-fit">
                      <button
                        type="button"
                        onClick={(e) => {
                          edit(favorite, favorite.label);
                          e.stopPropagation();
                        }}
                        className="text-sm w-fit"
                      >
                        저장
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          toggleEdit(favorite);
                          e.stopPropagation();
                        }}
                        className="text-sm w-fit"
                      >
                        취소
                      </button>
                    </div>
                  </div>
                ) : (
                  <span className="mb-2  text-center text-lg font-semibold">
                    {favorite.label}
                  </span>
                )}

                <div onClick={(e) => e.stopPropagation()}>
                  <FavoriteCardWeather favorite={favorite} />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
