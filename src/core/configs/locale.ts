const config = {
    supportedLanguages: ["en", "id"] as const,
    defaultLanguage: "en",
    fallbackLanguage: "en",
}


export type SupportedLanguage = typeof config.supportedLanguages[number]

export default config;

