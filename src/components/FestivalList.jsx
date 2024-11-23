import { Link } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import { useAtom, useAtomValue } from "jotai";
import { highlightAtom } from "../atoms/highlightAtom";
import { festivalsAtom } from "../atoms/festivalsAtom";
import { mapFiltersAtom } from "../atoms/mapFiltersAtom";
import { AnimatePresence, motion } from "motion/react";
import { filterFestivals } from "../utils";

export default function FestivalList() {
  const [highlight, setHighlight] = useAtom(highlightAtom);
  const [location, setLocation] = useHashLocation();
  const filters = useAtomValue(mapFiltersAtom);
  const festivals = useAtomValue(festivalsAtom);

  return (
    <>
      <h2 className="font-vk border-b border-t border-[salmon] p-1 pt-2 text-center text-xl font-bold text-[salmon] sm:text-2xl lg:text-3xl">
        Festivals in 2025
      </h2>
      <ul className="font-vk flex flex-wrap items-start justify-start overflow-y-scroll p-2 text-center">
        <AnimatePresence>
          {filterFestivals(festivals, filters, location)
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((f) => {
              const hl = highlight === f.slug;
              return (
                <motion.li
                  key={f.name}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  layout
                  className="w-full"
                  onMouseEnter={() => setHighlight(f.slug)}
                  onMouseLeave={() => setHighlight(null)}
                >
                  <Link
                    className={`text-center text-lg font-bold transition hover:text-[salmon] md:text-xl lg:text-2xl ${hl ? "text-[salmon]" : ""}`}
                    href={`/${f.slug}`}
                  >
                    {f.name}
                  </Link>
                </motion.li>
              );
            })}
        </AnimatePresence>
      </ul>
    </>
  );
}
