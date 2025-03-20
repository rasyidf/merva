import type { FeatureMetadata } from "@/shared/types";
import { validateFeatureConfig, testFeatureRoutes, testFeatureNavigation } from "@/shared/utils/feature-test";
import { logger } from "../logging";

export class FeatureValidator {
  private static instance: FeatureValidator;
  private validatedFeatures = new Set<string>();

  private constructor() {}

  static getInstance(): FeatureValidator {
    if (!FeatureValidator.instance) {
      FeatureValidator.instance = new FeatureValidator();
    }
    return FeatureValidator.instance;
  }

  validateFeature(feature: FeatureMetadata): boolean {
    if (this.validatedFeatures.has(feature.id)) {
      return true;
    }

    const configResults = validateFeatureConfig(feature);
    const routeResults = testFeatureRoutes(feature);
    const navResults = testFeatureNavigation(feature);

    const allErrors = [
      ...configResults.errors,
      ...routeResults.errors,
      ...navResults.errors
    ];

    if (allErrors.length > 0) {
      logger.error(`Feature validation failed for ${feature.id}:`, {
        feature: feature.id,
        errors: allErrors
      });
      return false;
    }

    this.validatedFeatures.add(feature.id);
    return true;
  }

  validateFeatures(features: FeatureMetadata[]): boolean {
    const results = features.map(feature => {
      const isValid = this.validateFeature(feature);
      return { feature: feature.id, isValid };
    });

    const invalidFeatures = results.filter(r => !r.isValid);
    if (invalidFeatures.length > 0) {
      logger.error('Feature validation failed for multiple features:', {
        invalidFeatures: invalidFeatures.map(f => f.feature)
      });
      return false;
    }

    return true;
  }

  clearValidation(featureId?: string) {
    if (featureId) {
      this.validatedFeatures.delete(featureId);
    } else {
      this.validatedFeatures.clear();
    }
  }
}