import { atom } from "jotai";

function todayOutOf365(date) {
  return (
    (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) -
      Date.UTC(date.getFullYear(), 0, 0)) /
    24 /
    60 /
    60 /
    1000
  );
}

const now = new Date();

export const defaultFilters = {
  query: "",
  dateRange: {
    from: now,
    to: "2025-12-31",
    range: [todayOutOf365(now), 365],
  },
  showIn: true,
  showOut: true,
};

export const mapFiltersAtom = atom(defaultFilters);
