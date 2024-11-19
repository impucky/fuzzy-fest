import { formatDateRange, isDev } from "../utils";
import { useHashLocation } from "wouter/use-hash-location";
import { useAtomValue } from "jotai";
import { festivalsAtom } from "../atoms/festivalsAtom";
import BackLink from "./BackLink";
import Lineup from "./Lineup";
import TentIcon from "../icons/tent.svg?react";
import BuildingIcon from "../icons/building.svg?react";

export default function Festival() {
  const [location, setLocation] = useHashLocation();
  const festivals = useAtomValue(festivalsAtom);
  const info = festivals.find((f) => f.slug === location.slice(1));

  if (!info) return setLocation("/");

  return (
    <>
      <BackLink />
      <div className="flex h-full flex-col overflow-y-scroll">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="h-auto min-h-24">
            <img
              className="mt-2 h-auto max-h-16 w-auto md:max-h-32"
              src={`${isDev ? "." : ""}${info.logo}`}
            />
          </div>
          <h2 className="font-vk text-xl font-bold sm:text-2xl">{info.name}</h2>
          <p className="text-xl">
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
          <Lineup lineup={info.lineup} />
        ) : (
          <p className="w-full p-2 text-center text-lg">Lineup TBA</p>
        )}
      </div>
    </>
  );
}
