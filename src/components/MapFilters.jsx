import { useState } from "react";
import { formatDate } from "../utils";
import * as Slider from "@radix-ui/react-slider";
import * as Checkbox from "@radix-ui/react-checkbox";
import FilterIcon from "../icons/filter.svg?react";
import SearchIcon from "../icons/search.svg?react";
import TentIcon from "../icons/tent.svg?react";
import BuildingIcon from "../icons/building.svg?react";

export default function MapFilters({ filters, setFilters, defaultFilters }) {
  const [sliderRange, setSliderRange] = useState([1, 365]);
  const [collapsed, setCollapsed] = useState(true);

  function onDateChange(sliderRange) {
    setSliderRange(sliderRange);
    setFilters({
      ...filters,
      dateRange: { from: from365(sliderRange[0]), to: from365(sliderRange[1]) },
    });
  }

  function from365(d) {
    const date = new Date(2025, 0);
    date.setDate(d);
    return date;
  }

  function onFilterReset() {
    setFilters(defaultFilters);
    setSliderRange([1, 365]);
  }

  return (
    <div className="absolute left-0 top-0 z-[500] m-2 flex flex-col gap-2 sm:m-4">
      <div className="flex gap-2">
        <SearchBar filters={filters} setFilters={setFilters} />
        <button
          className="grid h-12 w-12 place-items-center rounded-full bg-neutral-800 p-2 hover:bg-neutral-700"
          onClick={() => setCollapsed(!collapsed)}
        >
          <FilterIcon
            className={`h-6 w-6 cursor-pointer transition ${collapsed ? "text-neutral-400" : "text-red-400"}`}
          />
        </button>
      </div>
      <div
        className={`flex w-min flex-col gap-2 transition duration-300 ${collapsed ? "invisible opacity-0" : "visible opacity-100"}`}
      >
        <DateRange
          range={sliderRange}
          onDateChange={onDateChange}
          from365={from365}
        />
        <InOut filters={filters} setFilters={setFilters} />
      </div>
    </div>
  );
}

function SearchBar({ filters, setFilters }) {
  return (
    <div className="relative flex h-12 w-72 items-center">
      <input
        className="peer absolute h-12 w-full rounded-3xl bg-neutral-800 px-4 pl-12 text-lg outline-none transition-all duration-200 hover:shadow-[0_0_0_1px_#555] focus:shadow-[0_0_0_2px_#f87171]"
        type="text"
        placeholder="Search festivals or bands"
        value={filters.query}
        onChange={(e) => {
          setFilters({ ...filters, query: e.target.value });
        }}
      />
      <SearchIcon className="absolute h-6 pl-3 text-[#999] transition-all duration-200 peer-hover:text-white peer-focus:text-white" />
    </div>
  );
}

function DateRange({ range, onDateChange, from365 }) {
  return (
    <div className="w-72 rounded-xl bg-neutral-800 p-2">
      <div className="flex w-full justify-between px-2">
        <span className="w-1/2 text-left">{formatDate(from365(range[0]))}</span>
        <span className="text-neutral-500">|</span>
        <span className="w-1/2 text-right">
          {formatDate(from365(range[1]))}
        </span>
      </div>
      <Slider.Root
        value={range}
        className="relative mt-2 flex h-6 w-full items-center p-1"
        min={1}
        max={365}
        minStepsBetweenThumbs={1}
        onValueChange={(day) => onDateChange(day)}
      >
        <Slider.Track className="relative h-full grow rounded-lg bg-neutral-800 shadow-[inset_0_0_5px_rgba(0,0,0,0.4)]">
          <Slider.Range className="absolute h-full bg-neutral-400 shadow-[inset_0_0_2px_rgba(0,0,0,0.4)]" />
        </Slider.Track>
        <Slider.Thumb className="block h-6 w-6 cursor-pointer rounded-full bg-red-400 hover:bg-red-300" />
        <Slider.Thumb className="block h-6 w-6 cursor-pointer rounded-full bg-red-400 hover:bg-red-300" />
      </Slider.Root>
    </div>
  );
}

function InOut({ filters, setFilters }) {
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
