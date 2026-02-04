import { CurrentWeatherWidget } from "@/widgets/current-weather";
import { LocationSearchPanelWidget } from "@/widgets/location-search-panel";

export default function HomePage() {
  return (
    <>
      <CurrentWeatherWidget />
      <LocationSearchPanelWidget />
    </>
  );
}
