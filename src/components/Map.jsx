import { MapContainer, Marker, TileLayer, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { useMap } from "react-leaflet/hooks";
import { useHashLocation } from "wouter/use-hash-location";
import { useState, useEffect } from "react";
import { findCoordsCenter, formatDate, filterFestivals } from "../utils";
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
    <div className="relative h-2/5 w-full flex-grow lg:h-full lg:w-3/5">
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
                    setHighlight(f.slug);
                  },
                  mouseout: () => {
                    setHighlight(null);
                  },
                }}
              >
                {/* permanent tooltip but only renders if matching highlight or viewing fest */}
                {(highlight === f.slug || location.slice(1) === f.slug) && (
                  <Tooltip direction="top" offset={[-15, -12]} permanent={true}>
                    <div className="text-center text-white">
                      <span className="font-vk text-[1rem] font-bold sm:text-lg">
                        {f.name}
                      </span>
                      <br />
                      {f.dates.provisional ? (
                        <span>{`${f.dates.provisional} (TBA)`}</span>
                      ) : (
                        <span className="text-xs">
                          {f.dates.start === f.dates.end
                            ? `${formatDate(f.dates.start)}`
                            : `${formatDate(f.dates.start)} - ${formatDate(f.dates.end)}`}
                        </span>
                      )}
                    </div>
                  </Tooltip>
                )}
              </Marker>
            );
          })}
          <MapCenterHandler center={center} location={location} />
        </MapContainer>
      </>
    </div>
  );
}
