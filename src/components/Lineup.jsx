import { useState } from "react";
import { isDev } from "../utils";
import { useAtomValue } from "jotai";
import { bandsAtom } from "../atoms/bandsAtom";
import ArrowDownIcon from "../icons/arrow-down.svg?react";

export default function Lineup({ lineup }) {
  const [collapsed, setCollapsed] = useState(false);
  const allBands = useAtomValue(bandsAtom);
  const bands = allBands.filter((b) => lineup.includes(b.slug));
  const tba = bands.length === 0;

  return (
    <>
      <div className="z-10 my-2 flex w-full items-center justify-center">
        <button
          className="flex cursor-pointer items-center p-1 hover:underline"
          onClick={() => setCollapsed(!collapsed)}
          disabled={tba}
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
        className={`font-vk visible z-0 flex origin-top flex-wrap content-start overflow-y-scroll text-center transition ${collapsed ? "invisible -translate-y-16 scale-y-0 pr-2 opacity-0" : ""}`}
      >
        {tba ? (
          <span className="w-full text-center text-lg md:text-xl">
            To be announced!
          </span>
        ) : (
          bands
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((b, i) => {
              return (
                <li
                  key={b.name + i}
                  className="group relative flex h-16 w-1/2 items-center justify-center lg:h-32 lg:w-full"
                >
                  <img
                    className="h-full w-full object-cover brightness-[0.4] transition group-hover:brightness-[0.6]"
                    src={`${isDev ? "." : ""}${b.photo}`}
                  />
                  <span className="text-md absolute rounded-sm p-1 font-bold leading-snug transition sm:p-2 sm:text-xl sm:outline md:text-2xl">
                    {b.name}
                  </span>
                </li>
              );
            })
        )}
      </ul>
    </>
  );
}
