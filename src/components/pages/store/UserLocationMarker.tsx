import { userIcon } from "@/utils/data-map";
import { useEffect, useState } from "react";
import { Marker, Popup } from "react-leaflet";

export default function UserLocationMarker() {
  const [position, setPosition] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition([pos.coords.latitude, pos.coords.longitude]);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, []);

  return position === null ? null : (
    <Marker position={position} icon={userIcon}>
      <Popup>
        <div className="text-center p-2">
          <strong className="text-blue-600">📍 Your Location</strong>
        </div>
      </Popup>
    </Marker>
  );
}
