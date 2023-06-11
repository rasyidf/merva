import i18n from "@/libs/i18n";

export const LocalizationService = {
	changeLanguage: async (language: string): Promise<void> => {
		await i18n.changeLanguage(language);
	},
	getCurrentLanguage: (): string => {
		return i18n.language;
	},
	// Add any additional methods for your 3rd party libraries (e.g. dayjs, zod) here
};
