export const routes = {
  home: () => "/",
  detail: (locationId: string) => `/detail/${encodeURIComponent(locationId)}`,
} as const;
