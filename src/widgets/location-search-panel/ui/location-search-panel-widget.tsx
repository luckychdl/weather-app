import { useLocationSearch } from "@/features/search-location";
import { useNavigate } from "react-router-dom";
import { routes } from "@/shared/config";

export function LocationSearchPanelWidget() {
  const navigate = useNavigate();
  const { keyword, setKeyword, results } = useLocationSearch();

  return (
    <section className="mx-auto max-w-3xl p-4">
      <h2 className="text-lg font-semibold">장소 검색</h2>

      <input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="지역명을 입력하세요 (예: 종로구, 청운동)"
        className="mt-3 w-full rounded border px-3 py-2 text-sm"
      />

      {results.length > 0 && (
        <ul className="mt-3 rounded border">
          {results.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => navigate(routes.detail(item.id))}
                className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
