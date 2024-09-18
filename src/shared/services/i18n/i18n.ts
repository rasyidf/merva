import { locales } from "@/app/locales";
import i18n, { InitOptions } from "i18next";
import { initReactI18next as initReact } from "react-i18next";

import { z } from "zod";
import { zodI18nMap } from "zod-i18n-map";

i18n.use(initReact).init({
  // debug: isDev,
  lng: "id",
  interpolation: {
    escapeValue: false,
    skipOnVariables: false,
  },
  resources: locales,
  supportedLngs: ["id"],
  defaultNS: "translation",
} satisfies InitOptions);

z.setErrorMap(zodI18nMap);

export const LocalizationService = {
  changeLanguage: async (language: string): Promise<void> => {
    await i18n.changeLanguage(language);
  },
  getCurrentLanguage: (): string => {
    return i18n.language;
  },
};

export default i18n;
