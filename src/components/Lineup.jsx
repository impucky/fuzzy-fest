import { useState } from "react";
import { isDev } from "../utils";
import { useAtomValue } from "jotai";
import { bandsAtom } from "../atoms/bandsAtom";
import ArrowDownIcon from "../icons/arrow-down.svg?react";

export default function Lineup({ lineup }) {
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
        className={`font-vk visible z-0 flex origin-top flex-wrap content-start justify-center text-center transition ${collapsed ? "invisible -translate-y-16 scale-y-0 pr-2 opacity-0" : ""}`}
      >
        {bands
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((band, i) => {
            return <BandItem key={band.name + i} band={band} />;
          })}
      </ul>
    </>
  );
}

function BandItem({ band }) {
  return (
    <li className="group relative flex h-16 w-1/2 items-center justify-center md:h-24 lg:h-32">
      <img
        className="h-full w-full object-cover brightness-[0.4] transition group-hover:brightness-[0.6]"
        src={`${isDev ? "." : ""}${band.photo}`}
      />
      <span className="text-md absolute rounded-sm p-1 font-bold leading-snug transition sm:text-xl md:text-2xl">
        {band.name}
      </span>
    </li>
  );
}
