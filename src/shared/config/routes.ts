export const routes = {
  home: () => "/",
  detail: (locationId: string) => `/detail/${encodeURIComponent(locationId)}`,
} as const;

export function decodeLocationId(param?: string) {
  return param ? decodeURIComponent(param) : "";
}
