import type { PropsWithChildren } from "react";
import { I18nextProvider } from "react-i18next";
import { i18nInstance } from "./i18n";

export const LanguageProvider = (props: PropsWithChildren) => {
  return <I18nextProvider i18n={i18nInstance}>{props.children}</I18nextProvider>;
};
