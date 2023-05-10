import { PreferenceState, usePreferencesStore } from "./usePreferencesStore";
import { createStore, get, keys as dbkeys, set } from "idb-keyval";
import { APP_NAME } from "@/utils/constants";

const store = createStore(APP_NAME, "preferences");


export const PreferenceService = {
  getPreference: async (key: string): Promise<string | null | undefined> => {
    return get(key, store);
  },

  setPreference: async (key: string, value: string): Promise<void> => {
    await set(key, value, store);
    usePreferencesStore.getState().setPreference(key as keyof PreferenceState, value);
  },

  loadPreferences: async (): Promise<void> => {
    const keys = await dbkeys(store);
    for (const key of keys) {
      const value = await get(key, store);
      usePreferencesStore.getState().setPreference(key as keyof PreferenceState, value);
    }
  },
};
