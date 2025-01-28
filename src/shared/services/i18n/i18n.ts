
import i18n from "i18next";
import { initReactI18next as initReact } from "react-i18next";
import { z } from "zod";
import { zodI18nMap } from "zod-i18n-map";
import i18nConfig from "./i18n.config";


i18n.use(initReact).init(i18nConfig);

z.setErrorMap(zodI18nMap);

export const i18nInstance = i18n;
