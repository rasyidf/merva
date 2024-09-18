import { create, createStore } from "zustand";

export type PreferenceState = {
  language: string;
  theme: string;
  // define more preferences here
  setPreference: (key: keyof PreferenceState, value: string) => void;
};

export const usePreferencesStore = createStore<PreferenceState>((set) => ({
  language: "en",
  theme: "light",
  // add more default preferences here
  setPreference: (key, value) => set({ [key]: value }),
}));
