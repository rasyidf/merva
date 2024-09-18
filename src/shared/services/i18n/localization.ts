import i18n from "@/shared/libs/i18n";

export const LocalizationService = {
  changeLanguage: async (language: string): Promise<void> => {
    await i18n.changeLanguage(language);
  },
  getCurrentLanguage: (): string => {
    return i18n.language;
  },
};
