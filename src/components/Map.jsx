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
import Header from "./Header";
import InfoLink from "./InfoLink";
import { useState, useEffect } from "react";
import { useHashLocation } from "wouter/use-hash-location";
import { findCoordsCenter, formatDate, filterFestivals } from "../utils";

// TODO Custom markers
function MapCenterHandler({ center, location }) {
  const [prevCenter, setPrevCenter] = useState(center);
  const map = useMap();
  // Don't recenter when navigating back to list
  if (location === "" || center === prevCenter) return;
  map.flyTo(center, 10);
  setPrevCenter(center);
}

const defaultFilters = {
  query: "",
  dateRange: { from: "2025-01-01", to: "2025-12-31" },
  showIn: true,
  showOut: true,
};

export default function Map({ festivals, highlight, onFestivalHover }) {
  const [location, setLocation] = useHashLocation();
  const [center, setCenter] = useState(null);
  const [filters, setFilters] = useState(defaultFilters);

  const centerOnFestival = () => {
    const festival = festivals.find((f) => location === `/${f.slug}`);
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
    if (location !== "/") {
      centerOnFestival();
    }
  }, [location]);

  if (!center) return;

  return (
    <div className="relative h-2/5 w-full lg:order-2 lg:h-full lg:w-3/5">
      <Header />
      <InfoLink />
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
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {filterFestivals(festivals, filters, location).map((f) => {
            const position = [f.location.lat, f.location.lon];
            return (
              <Marker
                key={f.name}
                position={position}
                eventHandlers={{
                  click: () => {
                    setCenter(position);
                    setLocation(f.slug);
                  },
                  mouseover: () => {
                    onFestivalHover(f.slug);
                  },
                  mouseout: () => {
                    onFestivalHover(null);
                  },
                }}
              >
                {/* permanent tooltip but only renders if matching highlight -- causes some null errors when going to another tab */}
                {highlight === f.slug && (
                  <Tooltip direction="top" offset={[-15, -12]} permanent={true}>
                    <div className="p-1 text-center text-white">
                      <span className="font-vk text-md font-bold md:text-lg">
                        {f.name}
                      </span>
                      <br />
                      {formatDate(f.dates.start)} - {formatDate(f.dates.end)}
                    </div>
                  </Tooltip>
                )}
              </Marker>
            );
          })}
          <ZoomControl position="bottomleft" />
          <MapCenterHandler center={center} location={location} />
        </MapContainer>
      </>
    </div>
  );
}
