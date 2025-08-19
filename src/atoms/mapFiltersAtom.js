import { atom } from "jotai";
import { todayOutOf365 } from "../utils";

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
  showExpired: false,
};

export const mapFiltersAtom = atom(defaultFilters);
