import L from "leaflet";

export const storeIcon = L.icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [35, 57],
  iconAnchor: [17, 57],
  popupAnchor: [1, -50],
  shadowSize: [57, 57],
});

// User location icon
export const userIcon = L.icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Data toko
export const storeData = {
  id: 1,
  name: "Lea Juice Store",
  address:
    "Jl. Batu III No.3, RT.7/RW.1, Gambir, Kecamatan Gambir, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10110",
  phone: "+62 812-3456-7890",
  hours: "08:00 - 21:00",
  email: "sokinngejus@leajuice.com",
  lat: -6.17892274257247,
  lng: 106.8355068673582,
  instagram: "@leajuice",
  whatsapp: "+6285545145170",
};

export const getDirections = () => {
  window.open(
    `https://www.google.com/maps/search/?api=1&query=${storeData.lat},${storeData.lng}`,
    "_blank"
  );
};
