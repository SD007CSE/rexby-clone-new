import React from "react";

const locations = [
  { position: [60.3913, 5.3221], name: "Bergen", description: "A beautiful city surrounded by mountains and fjords." },
  { position: [68.2093, 14.2294], name: "Lofoten", description: "Stunning islands above the Arctic Circle." },
  { position: [59.9139, 10.7522], name: "Oslo", description: "The capital of Norway, known for its museums and green spaces." },
];

export default function InteractiveMap() {
  // Only render on the client
  if (typeof window === "undefined") return null;

  // Import react-leaflet and leaflet CSS only on the client
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { MapContainer, TileLayer, Marker, Popup } = require("react-leaflet");
  require("leaflet/dist/leaflet.css");

  return (
    <MapContainer center={[60.472, 8.4689]} zoom={5} style={{ height: "100%", width: "100%" }} scrollWheelZoom={false}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
      />
      {locations.map((loc, idx) => (
        <Marker key={idx} position={loc.position as [number, number]}>
          <Popup>
            <div className="font-bold text-[#23233c]">{loc.name}</div>
            <div className="text-[#bfc2d9] text-sm">{loc.description}</div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
} 