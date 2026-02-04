import { Link, useParams } from "react-router-dom";
import { routes } from "@/shared/config";

export default function DetailPage() {
  const { locationId } = useParams<{ locationId: string }>();

  return (
    <main className="mx-auto max-w-5xl p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">상세 날씨</h1>
        <Link
          className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-50"
          to={routes.home()}
        >
          홈으로
        </Link>
      </div>

      <p className="mt-2 text-sm text-gray-500">
        locationId: <span className="font-mono">{locationId ?? "(없음)"}</span>
      </p>

      <div className="mt-6 rounded-xl border p-4">
        <p className="text-sm">
          여기에 “현재/최저/최고/시간대별” 날씨 위젯이 들어갑니다.
        </p>
      </div>
    </main>
  );
}
