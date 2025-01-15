import { localeConfig } from "@/core/configs";
import { SupportedLanguage } from "@/core/configs/locale";
import { locales } from "@/shared/locales";
import { InitOptions } from "i18next";

const i18nConfig: InitOptions = {
    debug: true,
    lng: localeConfig.defaultLanguage as SupportedLanguage,
    interpolation: {
        escapeValue: false,
        skipOnVariables: false,
    },
    resources: {},
    supportedLngs: localeConfig.supportedLanguages,
    defaultNS: "translation",
    fallbackLng: localeConfig.fallbackLanguage,
};

// add default resources
i18nConfig.resources = locales;

export default i18nConfig;