import { CurrentWeatherWidget } from "@/widgets/current-weather";
import { FavoriteCardsWidgets } from "@/widgets/favorite-cards";
import { LocationSearchPanelWidget } from "@/widgets/location-search-panel";

export default function HomePage() {
  return (
    <>
      <CurrentWeatherWidget />
      <FavoriteCardsWidgets />
      <LocationSearchPanelWidget />
    </>
  );
}
