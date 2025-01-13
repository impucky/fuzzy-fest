import { useState } from "react";
import { isDev } from "../utils";
import { useAtom, useSetAtom, useAtomValue } from "jotai";
import { bandsAtom } from "../atoms/bandsAtom";
import { triggerRecenterAtom } from "../atoms/triggerRecenterAtom";
import { mapFiltersAtom } from "../atoms/mapFiltersAtom";
import { defaultFilters } from "../atoms/mapFiltersAtom";
import ArrowDownIcon from "../icons/arrow-down.svg?react";
import SearchIcon from "../icons/search.svg?react";

export default function Lineup({ lineup, partial }) {
  const [collapsed, setCollapsed] = useState(false);
  const allBands = useAtomValue(bandsAtom);
  const bands = allBands.filter((b) => lineup.includes(b.slug));

  return (
    <>
      <div className="z-10 my-2 flex w-full items-center justify-center">
        <button
          className="flex cursor-pointer items-center p-1 hover:underline"
          onClick={() => setCollapsed(!collapsed)}
        >
          <ArrowDownIcon
            className={`h-8 w-8 transition ${collapsed ? "-scale-y-100" : ""}`}
          />
          <span className="font-vk text-xl font-bold md:text-3xl">LINEUP</span>
          <ArrowDownIcon
            className={`h-8 w-8 transition ${collapsed ? "-scale-y-100" : ""}`}
          />
        </button>
      </div>
      <ul
        className={`font-vk visible z-0 flex origin-top flex-wrap content-start justify-center text-center transition ${collapsed ? "invisible h-0 -translate-y-16 scale-y-0 pr-2 opacity-0" : ""}`}
      >
        {bands
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((band, i) => {
            return <BandItem key={band.name + i} band={band} />;
          })}
        {partial && (
          <p className="font-vk mt-1 w-full p-2 text-center text-lg sm:text-xl">
            + many more...
          </p>
        )}
      </ul>
    </>
  );
}

function BandItem({ band }) {
  const [filters, setFilters] = useAtom(mapFiltersAtom);
  const recenter = useSetAtom(triggerRecenterAtom);

  function onBandClick() {
    setFilters({ ...defaultFilters, query: band.slug.replaceAll("-", " ") });
    recenter(true);
  }

  return (
    <li className="group relative flex h-24 w-1/2 items-center justify-center lg:h-32">
      <img
        className="h-full w-full object-cover brightness-[0.4] transition group-hover:brightness-[0.6]"
        src={`${isDev ? "." : ""}${band.photo}`}
      />
      <span className="text-md absolute rounded-sm p-1 font-bold leading-snug sm:text-xl md:text-2xl">
        {band.name}
      </span>
      <SearchIcon
        onClick={onBandClick}
        className="absolute right-2 top-2 ml-2 inline size-8 cursor-pointer text-neutral-400 opacity-0 transition hover:text-white group-hover:opacity-100"
      />
    </li>
  );
}
