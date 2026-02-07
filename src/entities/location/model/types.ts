export type LocationSearchItem = {
  id: string;
  label: string;
  searchable: string;
};

export type FavoriteLocation = {
  id: string;
  label: string;
  lat: number;
  lon: number;
  isEditing?: boolean;
};
