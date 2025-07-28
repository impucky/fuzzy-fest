import { formatDateRange, isDev } from "../utils";
import { useHashLocation } from "wouter/use-hash-location";
import { Redirect, useParams } from "wouter";
import { useAtomValue } from "jotai";
import { festivalsAtom } from "../atoms/festivalsAtom";
import Lineup from "./Lineup";
import TentIcon from "../icons/tent.svg?react";
import BuildingIcon from "../icons/building.svg?react";

export default function Festival() {
  const [location, setLocation] = useHashLocation();
  const params = useParams();
  const festivals = useAtomValue(festivalsAtom);
  const info = festivals.find((f) => f.slug === params.festival);

  if (!info) return <Redirect to="/2025" />;

  return (
    <div className="flex h-full flex-col overflow-y-scroll">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="h-auto min-h-fit">
          <img
            className="mt-2 h-auto max-h-20 w-auto max-w-64 md:max-h-32 lg:max-w-80 xl:max-w-full"
            src={`${isDev ? "." : ""}${info.logo}`}
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        </div>
        <h2 className="font-vk text-xl font-bold sm:text-2xl">{info.name}</h2>
        <p className="text-lg sm:text-xl">
          {info.location.city}, {info.location.country}
          {info.isIndoor ? (
            <BuildingIcon className="ml-1 inline h-6 w-6 fill-white" />
          ) : (
            <TentIcon className="ml-1 inline h-6 w-6 fill-white" />
          )}
        </p>
        {info.dates.provisional ? (
          <p>{`${info.dates.provisional} (TBA)`}</p>
        ) : (
          <p>{formatDateRange(info.dates, true)}</p>
        )}
        <a
          href={info.website}
          target="_blank"
          className="cursor-pointer text-[salmon] underline transition hover:text-white"
        >
          Homepage
        </a>
      </div>

      {info.lineup && info.lineup.length > 0 ? (
        <>
          <Lineup lineup={info.lineup} partial={info.partialLineup} />
        </>
      ) : (
        <p className="w-full p-2 text-center text-lg">Lineup TBA</p>
      )}
      {/* {info.playlistId && <Playlist id={info.playlistId} />} */}
    </div>
  );
}

function Playlist({ id }) {
  return (
    <div className="flex min-h-96 w-full flex-col items-center p-2">
      <span className="font-vk mt-2 pb-4 text-center text-xl font-bold md:text-3xl">
        PLAYLIST
      </span>
      <iframe
        style={{
          borderRadius: "12px",
          width: "100%",
          height: "100%",
          minHeight: "500px",
          paddingBottom: "1rem",
        }}
        src={`https://open.spotify.com/embed/playlist/${id}?theme=0`}
        allowFullScreen={false}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    </div>
  );
}
