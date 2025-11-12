import UserLocationMarker from "@/components/pages/store/UserLocationMarker";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { MapPin, Phone, Clock } from "lucide-react";
import { getDirections, storeData, storeIcon } from "@/utils/data-map";

interface MapProps {
  centerMap: [number, number];
}

export default function Map(props: MapProps) {
  const { centerMap } = props;
  function ChangeMapView({ coords }: { coords: [number, number] }) {
    const map = useMap();
    map.setView(coords, 15);
    return null;
  }

  return (
    <div className="lg:col-span-3">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-orange-100 sticky top-24">
        <div className="bg-gradient-to-r from-orange-400 to-orange-500 px-6 py-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <MapPin size={24} />
            Interactive Map
          </h3>
          <p className="text-orange-50 text-sm mt-1">
            Zoom in/out • Click marker for details • Drag to move
          </p>
        </div>

        <div className="w-full h-[500px] lg:h-[600px]">
          <MapContainer
            center={[storeData.lat, storeData.lng]}
            zoom={15}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            <ChangeMapView coords={centerMap} />

            {/* Store Marker */}
            <Marker position={[storeData.lat, storeData.lng]} icon={storeIcon}>
              <Popup maxWidth={300}>
                <div className="p-3">
                  <h3 className="text-lg font-bold text-orange-600 mb-2">
                    {storeData.name}
                  </h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p className="flex items-start gap-2">
                      <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                      <span>{storeData.address}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone size={16} className="flex-shrink-0" />
                      <span>{storeData.phone}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Clock size={16} className="flex-shrink-0" />
                      <span>{storeData.hours}</span>
                    </p>
                  </div>
                  <button
                    onClick={getDirections}
                    className="mt-3 w-full bg-gradient-to-r from-orange-400 to-orange-500 text-white py-2 rounded-lg hover:shadow-md transition-all font-medium text-sm"
                  >
                    Get Directions
                  </button>
                </div>
              </Popup>
            </Marker>

            <UserLocationMarker />
          </MapContainer>
        </div>

        <div className="px-6 py-4 bg-orange-50 border-t-2 border-orange-100">
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-orange-500 border-2 border-white shadow"></div>
              <span className="font-medium">Lea Juice Store</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-blue-500 border-2 border-white shadow"></div>
              <span className="font-medium">Your Location</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-orange-600">💡</span>
              <span className="italic">
                Use scroll to zoom, drag to move map
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
