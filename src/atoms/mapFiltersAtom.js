import { atom } from "jotai";

export const defaultFilters = {
  query: "",
  dateRange: { from: "2025-01-01", to: "2025-12-31", range: [1, 365] },
  showIn: true,
  showOut: true,
};

export const mapFiltersAtom = atom(defaultFilters);
