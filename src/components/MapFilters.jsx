import { useState } from "react";
import { formatDate } from "../utils";
import * as Slider from "@radix-ui/react-slider";

export default function MapFilters({ filters, setFilters, defaultFilters }) {
  const [sliderRange, setSliderRange] = useState([0, 365]);

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

  return (
    <div className="absolute right-0 top-0 z-[500] m-2 flex w-72 flex-col items-start justify-center gap-2 rounded-lg bg-neutral-200 p-2 text-black shadow">
      <div>
        <span className="text-lg font-bold">Filter festivals:</span>
        <button
          onClick={() => setFilters(defaultFilters)}
          className="rounded-xl border px-2 text-lg"
        >
          ⟲
        </button>
      </div>
      <div>
        <input
          className="rounded-md border bg-neutral-200 p-1 shadow-[inset_0_0_5px_rgba(0,0,0,0.2)]"
          type="text"
          placeholder="Search"
          value={filters.query}
          onChange={(e) => {
            setFilters({ ...filters, query: e.target.value });
          }}
        />
      </div>
      <div>
        From {formatDate(from365(sliderRange[0]))}
        <br />
        To {formatDate(from365(sliderRange[1]))}
      </div>
      <Slider.Root
        value={sliderRange}
        className="relative flex h-6 w-full items-center p-1"
        min={1}
        max={365}
        minStepsBetweenThumbs={1}
        onValueChange={(value) => onDateChange(value)}
      >
        <Slider.Track className="relative h-full grow rounded-lg bg-neutral-300 shadow-[inset_0_0_5px_rgba(0,0,0,0.4)]">
          <Slider.Range className="absolute h-full bg-red-300 shadow-[inset_0_0_2px_rgba(0,0,0,0.4)]" />
        </Slider.Track>
        <Slider.Thumb className="block h-6 w-6 rounded-full bg-red-400" />
        <Slider.Thumb className="block h-6 w-6 rounded-full bg-red-400" />
      </Slider.Root>
    </div>
  );
}
