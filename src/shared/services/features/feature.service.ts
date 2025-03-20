import type { FeatureMetadata } from "@/shared/types";
import { LocalizationService } from "../i18n/i18n.service";
import { processFeatures } from "./feature.utils";
import { SupportedLanguage } from "@/core/configs/locale";
import { featureStore } from "./feature.store";
import { FeatureValidator } from "./feature.validator";
import { logger } from "../logging";

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

export async function initializeFeatures(features: FeatureMetadata[]): Promise<void> {
  const validator = FeatureValidator.getInstance();
  
  // Validate all features before initialization
  const isValid = validator.validateFeatures(features);
  if (!isValid) {
    logger.error('Feature initialization aborted due to validation errors');
    throw new Error('Feature validation failed');
  }

  // Filter enabled features
  const enabledFeatures = features.filter(feature => feature.enabled !== false);

  // Load locales for all enabled features
  await Promise.all(enabledFeatures.map(loadFeatureLocales));

  // Initialize features in store
  featureStore.setState({
    features: enabledFeatures,
    initialized: true,
  });

  logger.info('Features initialized successfully', {
    totalFeatures: features.length,
    enabledFeatures: enabledFeatures.length,
  });
}
