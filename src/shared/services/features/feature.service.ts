import type { FeatureMetadata } from "@/shared/types";
import { LocalizationService } from "../i18n/i18n.service";
import { processFeatures } from "./feature.utils";
import { SupportedLanguage } from "@/core/configs/locale";

async function loadFeatureLocales(feature: FeatureMetadata) {
  if (!feature.locales?.length) return;

  await Promise.all(
    feature.locales.map(async (locale) => {
      try {
        const resources = await locale.resources();
        
        if (resources && resources.default) {
          LocalizationService.addResources(
            locale.lang as SupportedLanguage,
            feature.id,
            resources.default
          );
          console.debug(`Loaded locale ${locale.lang} for feature ${feature.id}`);
        } else {
          console.warn(`Empty resources for ${locale.lang} in feature ${feature.id}`);
        }
      } catch (error) {
        console.error(
          `Failed to load locale ${locale.lang} for feature ${feature.id}:`,
          error
        );
      }
    })
  );
}

export async function initializeFeatures(features: FeatureMetadata[]) {
  const enabledFeatures = features.filter(f => f.enabled !== false);

  // Load locales for all enabled features
  await Promise.all(enabledFeatures.map(loadFeatureLocales));
 
//   return processFeatures(enabledFeatures);
}
