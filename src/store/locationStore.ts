"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface LocationState {
  savedLocation: string;
  setSavedLocation: (location: string) => void;
  clearLocation: () => void;
}

export const useLocationStore = create<LocationState>()(
  persist(
    (set) => ({
      savedLocation: "",
      setSavedLocation: (location) => set({ savedLocation: location }),
      clearLocation: () => set({ savedLocation: "" }),
    }),
    {
      name: "spice-garden-location",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
