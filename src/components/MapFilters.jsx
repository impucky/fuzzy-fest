import { useState } from "react";

export default function MapFilters({ filters, setFilters, defaultFilters }) {
  function onDateChange(dateRange) {
    console.log("date change");
    setFilters({ ...filters, dateRange });
  }

  return (
    <div className="absolute right-0 top-0 z-[500] m-2 flex flex-col items-start justify-center gap-2 rounded-lg bg-white p-2 text-black shadow">
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
          className="rounded-md border p-1"
          type="text"
          placeholder="Search"
          value={filters.query}
          onChange={(e) => {
            setFilters({ ...filters, query: e.target.value });
          }}
        />
      </div>
      <div className="flex w-full justify-between">
        <span>From</span>
        <input
          type="date"
          value={filters.dateRange.from}
          onChange={(e) =>
            onDateChange({ from: e.target.value, to: filters.dateRange.to })
          }
        />
      </div>
      <div className="flex w-full justify-between">
        <span>To</span>
        <input
          type="date"
          value={filters.dateRange.to}
          onChange={(e) =>
            onDateChange({ from: filters.dateRange.from, to: e.target.value })
          }
        />
      </div>
    </div>
  );
}
