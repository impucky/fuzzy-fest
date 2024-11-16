import { formatDate, isDev } from "../utils";
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
    <div className="flex h-full flex-col">
      <BackLink />
      <div className="flex flex-col items-center justify-center text-center">
        <img
          className="mt-2 max-h-64 w-auto p-1"
          src={`${isDev ? "." : ""}${info.logo}`}
        />
        <h2 className="font-vk text-2xl font-bold sm:text-3xl">{info.name}</h2>
        <p className="text-xl">
          {info.location.city}, {info.location.country}
          {info.isIndoor ? (
            <BuildingIcon className="ml-1 inline h-6 w-6 fill-white" />
          ) : (
            <TentIcon className="ml-1 inline h-6 w-6 fill-white" />
          )}
        </p>
        <p>
          {formatDate(info.dates.start)} - {formatDate(info.dates.end)}, 2025
        </p>
        <a
          href={info.website}
          target="_blank"
          className="cursor-pointer text-[salmon] underline transition hover:text-white"
        >
          Homepage
        </a>
      </div>
      <Lineup lineup={info.lineup} />
    </div>
  );
}
