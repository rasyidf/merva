import { MantineColorScheme, MantineColorSchemeManager, isMantineColorScheme } from "@mantine/core";
import logger from "../logging";

export interface LocalStorageColorSchemeManagerOptions {
  key?: string;
}

export function localStorageColorSchemeManager({
  key = "abt-color-scheme",
}: LocalStorageColorSchemeManagerOptions = {}): MantineColorSchemeManager {
  let handleStorageEvent: (event: StorageEvent) => void;

  return {
    get: (defaultValue) => {
      if (typeof window === "undefined") {
        return defaultValue;
      }

      try {
        return (window.localStorage.getItem(key) as MantineColorScheme) || defaultValue;
      } catch {
        return defaultValue;
      }
    },

    set: (value) => {
      try {
        window.localStorage.setItem(key, value);
      } catch (error) {
        // eslint-disable-next-line no-console
        logger.warn("[@mantine/core] Local storage color scheme manager was unable to save color scheme.", error);
      }
    },

    subscribe: (onUpdate) => {
      handleStorageEvent = (event) => {
        if (event.storageArea === window.localStorage && event.key === key) {
          isMantineColorScheme(event.newValue) && onUpdate(event.newValue);
        }
      };

      window.addEventListener("storage", handleStorageEvent);
    },

    unsubscribe: () => {
      window.removeEventListener("storage", handleStorageEvent);
    },

    clear: () => {
      window.localStorage.removeItem(key);
    },
  };
}
