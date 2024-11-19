import { MapContainer, Marker, TileLayer, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { useMap } from "react-leaflet/hooks";
import { useHashLocation } from "wouter/use-hash-location";
import { useState, useEffect } from "react";
import { findCoordsCenter, formatDateRange, filterFestivals } from "../utils";
import { useAtom, useAtomValue } from "jotai";
import { highlightAtom } from "../atoms/highlightAtom";
import { festivalsAtom } from "../atoms/festivalsAtom";
import { mapFiltersAtom } from "../atoms/mapFiltersAtom";
import MapFilters from "./MapFilters";
import Header from "./Header";
import InfoLink from "./InfoLink";

// TODO Custom markers
function MapCenterHandler({ center, location }) {
  const [prevCenter, setPrevCenter] = useState(center);
  const map = useMap();
  // Don't recenter when navigating back to list
  if (location === "" || center === prevCenter) return;
  map.flyTo(center, 10);
  setPrevCenter(center);
}

export default function Map() {
  const [location, setLocation] = useHashLocation();
  const [center, setCenter] = useState(null);
  const [highlight, setHighlight] = useAtom(highlightAtom);
  const filters = useAtomValue(mapFiltersAtom);
  const festivals = useAtomValue(festivalsAtom);

  function centerOnFestival() {
    const festival = festivals.find((f) => location === `/${f.slug}`);
    if (festival) {
      setCenter([festival.location.lat, festival.location.lon]);
    }
  }

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
    <>
      {/* vignette */}
      <div className="pointer-events-none absolute z-[450] h-full w-full shadow-[inset_0_0_32px_rgba(0,0,0,0.9)]"></div>
      <Header />
      <InfoLink />
      <>
        <MapFilters />
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
          {filterFestivals(festivals, filters, location).map((festival) => {
            const position = [festival.location.lat, festival.location.lon];
            return (
              <Marker
                key={festival.name}
                position={position}
                eventHandlers={{
                  click: () => {
                    setCenter(position);
                    setLocation(festival.slug);
                  },
                  mouseover: () => {
                    setHighlight(festival.slug);
                  },
                  mouseout: () => {
                    setHighlight(null);
                  },
                }}
              >
                {/* permanent tooltip but only renders if matching highlight or viewing fest */}
                {(highlight === festival.slug ||
                  location.slice(1) === festival.slug) && (
                  <FestivalTooltip festival={festival} />
                )}
              </Marker>
            );
          })}
          <MapCenterHandler center={center} location={location} />
        </MapContainer>
      </>
    </>
  );
}

function FestivalTooltip({ festival }) {
  return (
    <Tooltip direction="top" offset={[-15, -12]} permanent={true}>
      <div className="text-center text-white">
        <span className="font-vk text-[1rem] font-bold sm:text-lg">
          {festival.name}
        </span>
        <br />
        {festival.dates.provisional ? (
          <span>{`${festival.dates.provisional} (TBA)`}</span>
        ) : (
          <span className="text-xs">
            {formatDateRange(festival.dates, true)}
          </span>
        )}
      </div>
    </Tooltip>
  );
}
