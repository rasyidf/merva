import i18n, { InitOptions } from "i18next";
import { initReactI18next as initReact } from "react-i18next";
import { locales } from "@/locales";

import { isDev } from "@/utils/constants";
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
	supportedLngs: ["en", "id"],
	defaultNS: "translation",
} satisfies InitOptions);

z.setErrorMap(zodI18nMap);

export default i18n;
