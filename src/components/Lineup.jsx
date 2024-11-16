import { useState } from "react";
import { isDev } from "../utils";
import ArrowDownIcon from "../icons/arrow-down.svg?react";

export default function Lineup({ bands }) {
  const [collapsed, setCollapsed] = useState(false);
  const tba = bands.length === 0;

  return (
    <>
      <div className="z-10 mb-2 mt-6 flex w-full items-center justify-center">
        <button
          className="flex cursor-pointer items-center p-1 hover:underline"
          onClick={() => setCollapsed(!collapsed)}
          disabled={tba}
        >
          <ArrowDownIcon
            className={`h-8 w-8 transition ${collapsed ? "-scale-y-100" : ""}`}
          />
          <span className="font-vk text-3xl font-bold">LINEUP</span>
          <ArrowDownIcon
            className={`h-8 w-8 transition ${collapsed ? "-scale-y-100" : ""}`}
          />
        </button>
      </div>
      <ul
        className={`font-vk visible z-0 flex origin-top flex-wrap content-start text-center transition ${collapsed ? "invisible -translate-y-16 scale-y-0 pr-2 opacity-0" : "overflow-y-scroll"}`}
      >
        {tba ? (
          <span className="w-full text-center text-xl">To be announced !</span>
        ) : (
          bands
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((b, i) => {
              return (
                <li
                  key={b.name + i}
                  className="group relative flex h-32 w-full items-center justify-center md:w-1/2 lg:w-full"
                >
                  <img
                    className="h-full w-full object-cover brightness-50 transition group-hover:brightness-75"
                    src={`${isDev ? "." : ""}${b.photo}`}
                  />
                  <span className="absolute rounded-sm bg-black bg-opacity-30 p-2 text-2xl font-bold leading-8 outline transition group-hover:bg-opacity-60">
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

//
