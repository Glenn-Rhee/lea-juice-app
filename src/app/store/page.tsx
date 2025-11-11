"use client";
import React, { useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { storeData } from "@/utils/data-map";
import StoreInfoCard from "@/components/pages/store/StoreInfoCard";
import InfoSection from "@/components/pages/store/InfoSection";
import Map from "@/components/pages/store/Map";

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function StoreLocator() {
  const [centerMap, setCenterMap] = useState<[number, number]>([
    storeData.lat,
    storeData.lng,
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Visit Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
              Store
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Come and experience the freshness of Lea Juice at our location
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          <StoreInfoCard setCenterMap={setCenterMap} />
          <Map centerMap={centerMap} />
        </div>

        <InfoSection />
      </div>
    </div>
  );
}
