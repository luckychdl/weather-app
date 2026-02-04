export type LocationSearchItem = {
  /** 상세 페이지 이동 등에 사용할 식별자(유니크) */
  id: string;
  /** 사용자에게 보여줄 라벨 */
  label: string;
  /** 검색용 문자열(정규화된 값) */
  searchable: string;
};
