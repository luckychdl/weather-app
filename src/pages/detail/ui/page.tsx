import { useParams } from "react-router-dom";
import { decodeLocationId } from "@/shared/config/routes";
import { LocationWeatherWidget } from "@/widgets/location-weather";

export default function DetailPage() {
  const params = useParams();
  const locationId = decodeLocationId(params.locationId);

  if (!locationId) return <div className="p-4">잘못된 접근입니다.</div>;

  return <LocationWeatherWidget locationId={locationId} />;
}
