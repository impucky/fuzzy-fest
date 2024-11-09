import {
  MapContainer,
  Marker,
  TileLayer,
  Tooltip,
  ZoomControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useMap } from "react-leaflet/hooks";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { findCoordsCenter } from "../utils";

function MapCenterHandler({ center, routerLocation }) {
  // Don't recenter when navigating back to list
  if (routerLocation === "/") return;

  const map = useMap();
  map.flyTo(center, 10);
  return null;
}

export default function Map(props) {
  const { festivals } = props;
  const [routerLocation, setRouterLocation] = useLocation();
  const [center, setCenter] = useState(null);

  const centerOnFestival = () => {
    console.log(routerLocation, festivals);
    const festival = festivals.find((f) => routerLocation.slice(1) === f.slug);
    if (festival) {
      setCenter([festival.location.lat, festival.location.lon]);
    }
  };

  // Center once on load
  useEffect(() => {
    const initialCenter = findCoordsCenter(
      festivals.map((f) => [f.location.lat, f.location.lon]),
    );
    setCenter(initialCenter);
  }, []);

  // Recenter when navigating from sidebar list
  useEffect(() => {
    if (routerLocation !== "/") {
      centerOnFestival();
    }
  }, [routerLocation]);

  if (!center) return;

  return (
    <MapContainer
      center={center}
      zoom={5}
      zoomControl={false}
      scrollWheelZoom={true}
      className="h-full w-4/6"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {festivals &&
        festivals.map((f) => {
          const position = [f.location.lat, f.location.lon];
          return (
            <Marker
              key={f.name}
              position={position}
              className="outline"
              eventHandlers={{
                click: () => {
                  setCenter(position);
                  setRouterLocation(f.slug);
                },
              }}
            >
              <Tooltip direction="top" offset={[-15, -12]}>
                {f.name}
              </Tooltip>
            </Marker>
          );
        })}
      <MapCenterHandler center={center} routerLocation={routerLocation} />
      <ZoomControl position="bottomleft" />
    </MapContainer>
  );
}
