import { Link } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import { useAtom, useAtomValue } from "jotai";
import { highlightAtom } from "../atoms/highlightAtom";
import { festivalsAtom } from "../atoms/festivalsAtom";
import { mapFiltersAtom } from "../atoms/mapFiltersAtom";
import { filterFestivals } from "../utils";

export default function FestivalList() {
  const [highlight, setHighlight] = useAtom(highlightAtom);
  const [location, setLocation] = useHashLocation();
  const filters = useAtomValue(mapFiltersAtom);
  const festivals = useAtomValue(festivalsAtom);

  return (
    <>
      <h2 className="font-vk mt-2 border-b border-[salmon] p-1 text-center text-2xl font-bold text-[salmon] sm:text-3xl">
        Festivals in 2025
      </h2>
      <ul className="font-vk flex flex-wrap items-start justify-start overflow-y-auto p-2 text-center">
        {filterFestivals(festivals, filters, location)
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((f) => {
            const hl = highlight === f.slug;
            return (
              <li
                key={f.name}
                className="w-full"
                onMouseEnter={() => setHighlight(f.slug)}
                onMouseLeave={() => setHighlight(null)}
              >
                <Link
                  className={`text-center text-lg font-bold transition hover:text-[salmon] md:text-2xl ${hl ? "text-[salmon]" : ""}`}
                  href={`/${f.slug}`}
                >
                  {f.name}
                </Link>
              </li>
            );
          })}
      </ul>
    </>
  );
}
