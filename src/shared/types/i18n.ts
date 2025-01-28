import { SupportedLanguage } from "@/core/configs/locale";

export interface ThirdPartyLocalization {
    changeLanguage: (language: SupportedLanguage) => void | Promise<void>;
}

export interface LocalizationResources {
    [key: string]: Record<string, unknown>;
}

export interface I18nServiceState {
    handleLanguageChange: (language: SupportedLanguage) => Promise<void>;
    getCurrentLanguage: () => SupportedLanguage;
    addResources: (lang: SupportedLanguage, namespace: string, resources: LocalizationResources) => void;
}
export { SupportedLanguage };

