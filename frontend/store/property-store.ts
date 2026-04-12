import { create } from "zustand";
import type { PropertyFilter } from "@/types";

interface PropertyState {
  filters: PropertyFilter;
  viewMode: "grid" | "list";
  setFilters: (filters: Partial<PropertyFilter>) => void;
  resetFilters: () => void;
  setViewMode: (mode: "grid" | "list") => void;
}

const defaultFilters: PropertyFilter = {
  listing_type: undefined,
  min_price: undefined,
  max_price: undefined,
  city: undefined,
  bedrooms: undefined,
  sort_by: "listed_at",
  sort_order: "desc",
  page: 1,
  page_size: 12,
};

export const usePropertyStore = create<PropertyState>((set) => ({
  filters: defaultFilters,
  viewMode: "grid",

  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters, page: 1 },
    })),

  resetFilters: () => set({ filters: defaultFilters }),

  setViewMode: (mode) => set({ viewMode: mode }),
}));
