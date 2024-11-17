import { useState } from "react";
import { formatDate } from "../utils";
import { useAtom } from "jotai";
import { mapFiltersAtom, defaultFilters } from "../atoms/mapFiltersAtom";
import * as Slider from "@radix-ui/react-slider";
import * as Checkbox from "@radix-ui/react-checkbox";
import FilterIcon from "../icons/filter.svg?react";
import SearchIcon from "../icons/search.svg?react";
import TentIcon from "../icons/tent.svg?react";
import BuildingIcon from "../icons/building.svg?react";
import CloseIcon from "../icons/close.svg?react";

export default function MapFilters() {
  const [filters, setFilters] = useAtom(mapFiltersAtom);
  const [collapsed, setCollapsed] = useState(true);

  function onFilterReset() {
    const resetFilters = defaultFilters;
    resetFilters.query = filters.query;
    setFilters(resetFilters);
  }

  return (
    <div className="pointer-events-none absolute right-0 top-0 z-[500] m-2 flex flex-col items-end gap-1">
      <div className="pointer-events-auto flex gap-1">
        <button
          className="grid h-10 w-10 place-items-center rounded-full bg-neutral-800 p-2 hover:bg-neutral-700"
          onClick={() => {
            if (!collapsed) onFilterReset();
            setCollapsed(!collapsed);
          }}
        >
          <FilterIcon
            className={`h-6 w-6 cursor-pointer transition ${collapsed ? "text-neutral-400" : "text-red-400"}`}
          />
        </button>
        <SearchBar />
      </div>
      <div
        className={`flex w-min flex-col gap-1 transition duration-300 ${collapsed ? "pointer-events-none invisible opacity-0" : "pointer-events-auto visible opacity-100"}`}
      >
        <DateRange />
        <InOut />
      </div>
    </div>
  );
}

function SearchBar() {
  const [filters, setFilters] = useAtom(mapFiltersAtom);
  return (
    <div className="relative flex h-10 w-72 items-center">
      <input
        className="peer absolute h-10 w-full rounded-3xl bg-neutral-800 px-4 pl-10 text-lg outline-none transition-all duration-200 hover:shadow-[0_0_0_1px_#555] focus:shadow-[0_0_0_2px_#f87171]"
        type="text"
        placeholder="Search festivals or bands"
        value={filters.query}
        onChange={(e) => {
          setFilters({ ...filters, query: e.target.value });
        }}
      />
      <SearchIcon className="pointer-events-none absolute h-6 pl-3 text-[#999] transition-all duration-200 peer-hover:text-white peer-focus:text-white" />
      <button
        className="absolute right-4"
        onClick={() => setFilters({ ...filters, query: "" })}
        disabled={!filters.query.length}
      >
        <CloseIcon
          className={`w-5 text-neutral-500 transition hover:text-white ${filters.query.length ? "opacity-100" : "pointer-events-none opacity-0"}`}
        />
      </button>
    </div>
  );
}

function DateRange() {
  const [filters, setFilters] = useAtom(mapFiltersAtom);

  function onDateChange(range) {
    setFilters({
      ...filters,
      dateRange: {
        from: from365(range[0]),
        to: from365(range[1]),
        range: range,
      },
    });
  }

  function from365(d) {
    const date = new Date(2025, 0);
    date.setDate(d);
    return date;
  }

  return (
    <div className="w-72 rounded-xl bg-neutral-800 p-2">
      <div className="flex w-full justify-between px-2">
        <span className="w-1/2 text-left">
          {formatDate(from365(filters.dateRange.range[0]))}
        </span>
        <span className="text-neutral-500">|</span>
        <span className="w-1/2 text-right">
          {formatDate(from365(filters.dateRange.range[1]))}
        </span>
      </div>
      <Slider.Root
        value={filters.dateRange.range}
        className="relative my-1 flex h-6 w-full items-center p-1"
        min={1}
        max={365}
        minStepsBetweenThumbs={1}
        onValueChange={(range) => onDateChange(range)}
      >
        <Slider.Track className="relative h-full grow rounded-lg bg-neutral-900">
          <Slider.Range className="absolute h-full bg-red-400 shadow-[inset_0_0_8px_rgba(0,0,0,0.8)]" />
        </Slider.Track>
        <Slider.Thumb className="block h-6 w-6 cursor-pointer rounded-full bg-[url('/favicon.png')] bg-cover shadow-[2px_2px_3px_rgba(0,0,0,0.6)] hover:shadow-[2px_2px_6px_rgba(0,0,0,0.5)]" />
        <Slider.Thumb className="block h-6 w-6 cursor-pointer rounded-full bg-[url('/favicon.png')] bg-cover shadow-[2px_2px_3px_rgba(0,0,0,0.6)] hover:shadow-[2px_2px_6px_rgba(0,0,0,0.5)]" />
      </Slider.Root>
    </div>
  );
}

function InOut() {
  const [filters, setFilters] = useAtom(mapFiltersAtom);

  return (
    <div className="flex w-72 justify-between overflow-hidden rounded-xl bg-neutral-800">
      <Checkbox.Root
        className="flex w-1/2 items-center justify-center gap-1 bg-neutral-800 p-1 py-2 transition hover:bg-neutral-700"
        checked={filters.showIn}
        onCheckedChange={() =>
          setFilters({ ...filters, showIn: !filters.showIn })
        }
      >
        <BuildingIcon
          className={`w-6 transition ${filters.showIn ? "text-red-400" : "text-neutral-400"}`}
        />
        <span
          className={`transition ${filters.showIn ? "" : "text-neutral-400"}`}
        >
          Show indoor
        </span>
      </Checkbox.Root>
      <Checkbox.Root
        className="flex w-1/2 items-center justify-center gap-1 bg-neutral-800 p-1 py-2 transition hover:bg-neutral-700"
        checked={filters.showOut}
        onCheckedChange={() =>
          setFilters({ ...filters, showOut: !filters.showOut })
        }
      >
        <TentIcon
          className={`w-6 transition ${filters.showOut ? "text-red-400" : "text-neutral-400"}`}
        />
        <span
          className={`transition ${filters.showOut ? "" : "text-neutral-400"}`}
        >
          Show outdoor
        </span>
      </Checkbox.Root>
    </div>
  );
}
