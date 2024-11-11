import {
  MapContainer,
  Marker,
  TileLayer,
  Tooltip,
  ZoomControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { useMap } from "react-leaflet/hooks";
import MapFilters from "./MapFilters";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { findCoordsCenter, baseUrl, formatDate } from "../utils";

function MapCenterHandler({ center, routerLocation }) {
  const [prevCenter, setPrevCenter] = useState(center);
  const map = useMap();
  // Don't recenter when navigating back to list
  if (routerLocation === baseUrl || center === prevCenter) return;
  map.flyTo(center, 10);
  setPrevCenter(center);
}

const defaultFilters = {
  query: "",
  dateRange: { from: "2025-01-01", to: "2025-12-31" },
};

export default function Map(props) {
  const { festivals } = props;
  const [routerLocation, setRouterLocation] = useLocation();
  const [center, setCenter] = useState(null);
  const [filters, setFilters] = useState(defaultFilters);

  const centerOnFestival = () => {
    // 12 for /fuzzy-fest/
    const festival = festivals.find((f) => routerLocation.slice(12) === f.slug);
    if (festival) {
      setCenter([festival.location.lat, festival.location.lon]);
    }
  };

  // Center once to average of festivals
  useEffect(() => {
    const initialCenter = findCoordsCenter(
      festivals.map((f) => [f.location.lat, f.location.lon]),
    );
    setCenter(initialCenter);
  }, []);

  // Recenter when navigating from sidebar list
  useEffect(() => {
    if (routerLocation !== baseUrl) {
      centerOnFestival();
    }
  }, [routerLocation]);

  if (!center) return;

  return (
    <>
      <MapFilters
        filters={filters}
        setFilters={setFilters}
        defaultFilters={defaultFilters}
      />
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
        {filterFestivals(festivals, filters, routerLocation).map((f) => {
          const position = [f.location.lat, f.location.lon];
          return (
            <Marker
              key={f.name}
              position={position}
              className="outline"
              eventHandlers={{
                click: () => {
                  setCenter(position);
                  setRouterLocation(baseUrl + f.slug);
                },
              }}
            >
              <Tooltip direction="top" offset={[-15, -12]}>
                <div className="text-center">
                  <span className="font-bold">{f.name}</span>
                  <br />
                  {formatDate(f.dates.start)} - {formatDate(f.dates.end)}
                </div>
              </Tooltip>
            </Marker>
          );
        })}
        <MapCenterHandler center={center} routerLocation={routerLocation} />
        <ZoomControl position="bottomleft" />
      </MapContainer>
    </>
  );
}

function filterFestivals(festivals, filters, routerLocation) {
  return festivals.filter((f) => {
    const startDate = new Date(f.dates.start);
    const startFilter = new Date(filters.dateRange.from);
    const endFilter = new Date(filters.dateRange.to);
    // Always show if currently viewing
    if (routerLocation.includes(f.slug)) return true;
    // Filter search
    if (filters.query) {
      return f.name.toLowerCase().includes(filters.query.toLowerCase());
    }
    // Filter date range
    if (startDate < startFilter || startDate > endFilter) {
      return false;
    } else {
      return true;
    }
  });
}
