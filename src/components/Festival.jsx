import { formatDate, isDev } from "../utils";
import { Link } from "wouter";
import Lineup from "./Lineup";
import TentIcon from "../icons/tent.svg?react";
import BuildingIcon from "../icons/building.svg?react";

export default function Festival({ info, bands }) {
  if (!info) return <>...</>;

  return (
    <div className="flex h-full flex-col">
      <Link
        href="/"
        className="text-md p-2 text-center text-[salmon] shadow-md hover:bg-neutral-800 hover:text-white hover:underline"
      >
        ← Back to list
      </Link>
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
      <Lineup bands={bands} />
    </div>
  );
}
