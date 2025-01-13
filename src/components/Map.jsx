import { MapContainer, Marker, TileLayer, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { useMap } from "react-leaflet/hooks";
import { useHashLocation } from "wouter/use-hash-location";
import { useParams } from "wouter";
import { useState, useEffect } from "react";
import { findCoordsCenter, formatDateRange, filterFestivals } from "../utils";
import { useAtom, useAtomValue } from "jotai";
import { highlightAtom } from "../atoms/highlightAtom";
import { festivalsAtom } from "../atoms/festivalsAtom";
import { mapFiltersAtom } from "../atoms/mapFiltersAtom";
import { triggerRecenterAtom } from "../atoms/triggerRecenterAtom";
import MapFilters from "./MapFilters";
import Header from "./Header";
import InfoLink from "./InfoLink";

// TODO Custom markers
function MapCenterHandler({ center, location, zoom }) {
  const [prevCenter, setPrevCenter] = useState(center);
  const map = useMap();
  // Don't recenter when navigating back to list
  if (location === "" || center === prevCenter) return;
  map.flyTo(center, zoom);
  setPrevCenter(center);
}

export default function Map() {
  const [location, setLocation] = useHashLocation();
  const params = useParams();
  const [center, setCenter] = useState(null);
  const [zoom, setZoom] = useState(window.innerWidth < 1024 ? 4 : 5);
  const [highlight, setHighlight] = useAtom(highlightAtom);
  const [recenter, setRecenter] = useAtom(triggerRecenterAtom);
  const filters = useAtomValue(mapFiltersAtom);
  const festivals = useAtomValue(festivalsAtom);

  function centerOnFestival() {
    const festival = festivals.find((f) => location.includes(f.slug));
    if (festival) {
      setZoom(8);
      setCenter([festival.location.lat, festival.location.lon]);
    }
  }

  function centerOnSearch() {
    const matches = filterFestivals(festivals, filters, location);
    if (matches.length === 0) {
      setRecenter(false);
      return;
    }
    const newCenter = matches.map((f) => [f.location.lat, f.location.lon]);
    setZoom(5);
    setCenter(findCoordsCenter(newCenter));
    setRecenter(false);
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
    if (location.includes("/festival/")) {
      centerOnFestival();
    }
  }, [location]);

  // Recenter when clicking a band
  // Try out: recenter on query change ?
  useEffect(() => {
    if (recenter) {
      centerOnSearch();
    }
  }, [recenter]);

  if (!center) return;

  return (
    <div className="relative h-3/5 w-full flex-grow lg:h-full lg:w-3/5">
      {/* vignette */}
      <div className="pointer-events-none absolute z-[450] h-full w-full shadow-[inset_0_0_32px_rgba(0,0,0,0.9)]"></div>
      <Header />
      <InfoLink />
      <>
        <MapFilters />
        <MapContainer
          center={center}
          zoom={zoom}
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
                    setZoom(8);
                    setLocation(`/festival/${festival.slug}`);
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
                  location.includes(festival.slug)) && (
                  <FestivalTooltip festival={festival} />
                )}
              </Marker>
            );
          })}
          <MapCenterHandler center={center} location={location} zoom={zoom} />
        </MapContainer>
      </>
    </div>
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
