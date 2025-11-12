import { getDirections, storeData } from "@/utils/data-map";
import { Clock, Mail, MapPin, Navigation, Phone } from "lucide-react";

interface StoreInfoCardProps {
  setCenterMap: React.Dispatch<React.SetStateAction<[number, number]>>;
}

export default function StoreInfoCard(props: StoreInfoCardProps) {
  const { setCenterMap } = props;

  const callStore = () => {
    window.location.href = `tel:${storeData.phone}`;
  };

  const openWhatsApp = () => {
    window.open(
      `https://wa.me/${storeData.whatsapp.replace(/[^0-9]/g, "")}`,
      "_blank"
    );
  };

  const openInstagram = () => {
    window.open(
      `https://instagram.com/${storeData.instagram.replace("@", "")}`,
      "_blank"
    );
  };

  const focusStore = () => {
    setCenterMap([storeData.lat, storeData.lng]);
  };
  return (
    <div className="lg:col-span-2 space-y-6">
      <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-orange-100">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {storeData.name}
            </h2>
            <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-orange-400 to-orange-500 text-white text-sm font-medium rounded-full">
              ⭐ Main Store
            </span>
          </div>
          <MapPin className="text-orange-500 flex-shrink-0" size={32} />
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
            <MapPin
              size={20}
              className="mt-0.5 flex-shrink-0 text-orange-600"
            />
            <div>
              <p className="font-medium text-gray-900 mb-1">Address</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                {storeData.address}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
            <Phone size={20} className="mt-0.5 flex-shrink-0 text-orange-600" />
            <div>
              <p className="font-medium text-gray-900 mb-1">Phone</p>
              <p className="text-sm text-gray-600">{storeData.phone}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
            <Clock size={20} className="mt-0.5 flex-shrink-0 text-orange-600" />
            <div>
              <p className="font-medium text-gray-900 mb-1">Opening Hours</p>
              <p className="text-sm text-gray-600">{storeData.hours}</p>
              <p className="text-xs text-orange-600 mt-1">Open Every Day</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
            <Mail size={20} className="mt-0.5 flex-shrink-0 text-orange-600" />
            <div>
              <p className="font-medium text-gray-900 mb-1">Email</p>
              <p className="text-sm text-gray-600">{storeData.email}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={getDirections}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white py-3.5 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold"
          >
            <Navigation size={20} />
            Get Directions
          </button>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={callStore}
              className="flex items-center justify-center gap-2 bg-white border-2 border-orange-300 text-orange-600 py-3 rounded-xl hover:bg-orange-50 transition-all font-medium"
            >
              <Phone size={18} />
              Call
            </button>
            <button
              onClick={openWhatsApp}
              className="flex items-center justify-center gap-2 bg-white border-2 border-green-300 text-green-600 py-3 rounded-xl hover:bg-green-50 transition-all font-medium"
            >
              <svg
                width="18"
                height="18"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              WhatsApp
            </button>
          </div>

          <button
            onClick={focusStore}
            className="w-full flex items-center justify-center gap-2 bg-white border-2 border-gray-300 text-gray-700 py-3 rounded-xl hover:bg-gray-50 transition-all font-medium"
          >
            <MapPin size={18} />
            Focus on Store
          </button>
        </div>
      </div>

      <div className="bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl p-6 shadow-lg text-white">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
          Follow Us
        </h3>
        <button
          onClick={openInstagram}
          className="w-full flex items-center justify-center gap-3 bg-white text-orange-500 py-3 rounded-xl hover:shadow-md transition-all font-semibold"
        >
          <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
          {storeData.instagram}
        </button>
        <p className="text-orange-50 text-sm mt-3 text-center">
          Stay updated with our latest products & promotions!
        </p>
      </div>
    </div>
  );
}
