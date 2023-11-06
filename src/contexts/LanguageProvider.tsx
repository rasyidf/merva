import i18n from "@/libs/i18n";
import { I18nextProvider } from "react-i18next";

export const LanguageProvider = (props: { children: React.ReactNode }) => {
  return <I18nextProvider i18n={i18n}>{props.children}</I18nextProvider>;
};
