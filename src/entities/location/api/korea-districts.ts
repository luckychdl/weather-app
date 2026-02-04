import raw from "@/shared/assets/korea_districts.json";
import type { LocationSearchItem } from "../model/types";

const data = raw as string[];

export const locationIndex: LocationSearchItem[] = data.map((item) => {
  const parts = item.split("-"); // ["서울특별시", "종로구", "청운동"]
  const label = parts.join(" "); // "서울특별시 종로구 청운동"

  return {
    id: item, // 원본 문자열을 그대로 id로 사용 (유니크)
    label, // UI 표시용
    searchable: label, // 정규화는 search.ts에서 처리
  };
});
