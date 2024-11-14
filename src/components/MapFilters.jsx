import { useState } from "react";
import { formatDate } from "../utils";
import * as Slider from "@radix-ui/react-slider";
import * as Checkbox from "@radix-ui/react-checkbox";

export default function MapFilters({ filters, setFilters, defaultFilters }) {
  const [sliderRange, setSliderRange] = useState([1, 365]);

  function onDateChange(sliderRange) {
    setSliderRange(sliderRange);
    setFilters({
      ...filters,
      dateRange: { from: from365(sliderRange[0]), to: from365(sliderRange[1]) },
    });
  }

  function onFilterReset() {
    setFilters(defaultFilters);
    setSliderRange([1, 365]);
  }

  function from365(d) {
    const date = new Date(2025, 0);
    date.setDate(d);
    return date;
  }

  return (
    <div className="absolute right-0 top-0 z-[500] m-2 flex w-72 flex-col items-start justify-center gap-2 rounded-md bg-neutral-700 p-2 shadow-md">
      <div className="flex w-full justify-between gap-2">
        <input
          className="w-full rounded-md border bg-neutral-800 p-1 shadow-[inset_0_0_5px_rgba(0,0,0,0.5)]"
          type="text"
          placeholder="Search festivals or bands"
          value={filters.query}
          onChange={(e) => {
            setFilters({ ...filters, query: e.target.value });
          }}
        />
        <button
          onClick={onFilterReset}
          className="rounded-md border bg-neutral-600 px-2 text-lg hover:bg-neutral-500"
        >
          ⟲
        </button>
      </div>
      <div className="flex w-full justify-between">
        <span>{formatDate(from365(sliderRange[0]))}</span>
        <span>{formatDate(from365(sliderRange[1]))}</span>
      </div>
      <Slider.Root
        value={sliderRange}
        className="relative flex h-6 w-full items-center p-1"
        min={1}
        max={365}
        minStepsBetweenThumbs={1}
        onValueChange={(value) => onDateChange(value)}
      >
        <Slider.Track className="relative h-full grow rounded-lg bg-neutral-800 shadow-[inset_0_0_5px_rgba(0,0,0,0.4)]">
          <Slider.Range className="absolute h-full bg-neutral-400 shadow-[inset_0_0_2px_rgba(0,0,0,0.4)]" />
        </Slider.Track>
        <Slider.Thumb className="block h-6 w-6 cursor-pointer rounded-full bg-red-400 hover:bg-red-300" />
        <Slider.Thumb className="block h-6 w-6 cursor-pointer rounded-full bg-red-400 hover:bg-red-300" />
      </Slider.Root>
      <div className="flex w-full justify-between">
        <span>Show :</span>
        <div className="flex items-center gap-1">
          <Checkbox.Root
            className="flex h-6 w-6 items-center justify-center rounded-md bg-neutral-800"
            checked={filters.showIn}
            onCheckedChange={() =>
              setFilters({ ...filters, showIn: !filters.showIn })
            }
          >
            <Checkbox.Indicator className="h-4 w-4 rounded-sm bg-red-400" />
          </Checkbox.Root>
          <span>Indoor</span>
        </div>
        <div className="flex items-center gap-1">
          <Checkbox.Root
            className="flex h-6 w-6 items-center justify-center rounded-md bg-neutral-800"
            checked={filters.showOut}
            onCheckedChange={() =>
              setFilters({ ...filters, showOut: !filters.showOut })
            }
          >
            <Checkbox.Indicator className="h-4 w-4 rounded-sm bg-red-400" />
          </Checkbox.Root>
          <span>Outdoor</span>
        </div>
      </div>
    </div>
  );
}
