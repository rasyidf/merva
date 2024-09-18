import i18n, { InitOptions } from "i18next";
import { initReactI18next as initReact } from "react-i18next";
import { locales } from "@/app/locales";

import { isDev } from "@/shared/utils/constants";
import { z } from "zod";
import { zodI18nMap } from "zod-i18n-map";

i18n.use(initReact).init({
  debug: isDev,
  lng: "en",
  interpolation: {
    escapeValue: false,
    skipOnVariables: false,
  },
  resources: locales,
  defaultNS: "translation",
} satisfies InitOptions);

z.setErrorMap(zodI18nMap);

export default i18n;
