import { getFavorites } from "@/entities/location";
import { useFavorites } from "@/features/favorite-location";
import { useNavigate } from "react-router-dom";
import { routes } from "@/shared/config";
import { WeatherSummary } from "@/entities/weather";
export function FavoriteCardsWidgets() {
  const navigate = useNavigate();
  const { favorites, toggle, toggleEdit, changeLabel, edit, allCancel } =
    useFavorites();
  console.log(favorites, "favorites");
  return (
    <>
      {favorites.length > 0 && (
        <div className="mx-auto max-w-3xl p-4">
          <h2 className="text-lg font-semibold">즐겨찾기</h2>
          <div
            className="
          mt-4 flex gap-4
          overflow-x-auto flex-nowrap pb-2

        "
          >
            {favorites.map((favorite) => (
              <button
                key={favorite.id}
                onClick={() => {
                  allCancel();
                  navigate(routes.detail(favorite.id));
                }}
                className=" flex flex-col items-center p-2 text-sm min-w-fit min-h-[100px] border rounded-md  cursor-pointer"
              >
                <div className="flex flex-row items-center justify-between w-full">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggle(favorite);
                    }}
                    className="text-2xl text-yellow-500 cursor-pointer"
                  >
                    ★
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleEdit(favorite);
                    }}
                  >
                    편집
                  </button>
                </div>
                {favorite.isEditing ? (
                  <div className="flex flex-row items-center justify-between w-full">
                    <input
                      type="text"
                      className="p-2 border rounded-md"
                      value={favorite.label}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => changeLabel(favorite, e.target.value)}
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          edit(favorite, favorite.label);
                        }
                      }}
                    />
                    <div className="flex flex-row items-center gap-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          edit(favorite, favorite.label);
                        }}
                      >
                        저장
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleEdit(favorite);
                        }}
                      >
                        취소
                      </button>
                    </div>
                  </div>
                ) : (
                  <h3 className="text-left text-l font-semibold mb-2">
                    {favorite.label}
                  </h3>
                )}

                {favorite.weather && (
                  <WeatherSummary weather={favorite.weather} />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
