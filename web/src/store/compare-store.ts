"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

const MAX_COMPARE = 3;

interface CompareState {
  ids: string[];
  toggle: (id: string) => boolean; // returns false if rejected (limit reached)
  clear: () => void;
}

export const useCompareStore = create<CompareState>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (id) => {
        const { ids } = get();
        if (ids.includes(id)) {
          set({ ids: ids.filter((i) => i !== id) });
          return true;
        }
        if (ids.length >= MAX_COMPARE) return false;
        set({ ids: [...ids, id] });
        return true;
      },
      clear: () => set({ ids: [] }),
    }),
    { name: "ta-compare" }
  )
);

export { MAX_COMPARE };
