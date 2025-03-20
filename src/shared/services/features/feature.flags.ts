import type { FeatureMetadata, VersionConfig } from "@/shared/types";
import { logger } from "../logging";

interface FeatureVersion {
  featureId: string;
  version: string;
  enabled: boolean;
  components: Record<string, boolean>;
}

export class FeatureFlagService {
  private static instance: FeatureFlagService;
  private versions: Map<string, VersionConfig>;
  private featureFlags: Map<string, boolean>;

  private constructor() {
    this.versions = new Map();
    this.featureFlags = new Map();
  }

  static getInstance(): FeatureFlagService {
    if (!FeatureFlagService.instance) {
      FeatureFlagService.instance = new FeatureFlagService();
    }
    return FeatureFlagService.instance;
  }

  setFeatureVersion(featureId: string, version: VersionConfig): void {
    this.versions.set(featureId, version);
  }

  getFeatureVersion(featureId: string): VersionConfig | undefined {
    return this.versions.get(featureId);
  }

  setFeatureFlag(featureId: string, enabled: boolean): void {
    this.featureFlags.set(featureId, enabled);
  }

  isFeatureEnabled(featureId: string): boolean {
    return this.featureFlags.get(featureId) ?? false;
  }

  isComponentEnabled(featureId: string, componentId: string): boolean {
    const version = this.versions.get(featureId);
    return version?.components?.[componentId] ?? false;
  }

  upgradeFeature(featureId: string, newVersion: VersionConfig): void {
    const currentVersion = this.versions.get(featureId);
    if (!currentVersion) {
      this.setFeatureVersion(featureId, newVersion);
      return;
    }

    // Compare versions and log changes
    const changes = this.compareVersions(currentVersion, newVersion);
    logger.info(`Upgrading feature ${featureId}`, {
      from: currentVersion.version,
      to: newVersion.version,
      changes
    });

    this.setFeatureVersion(featureId, newVersion);
  }

  private compareVersions(oldVersion: VersionConfig, newVersion: VersionConfig) {
    const changes = {
      enabled: [] as string[],
      disabled: [] as string[]
    };

    // Compare component states
    Object.entries(newVersion.components).forEach(([componentId, enabled]) => {
      const wasEnabled = oldVersion.components[componentId] ?? false;
      if (enabled !== wasEnabled) {
        const changeList = enabled ? changes.enabled : changes.disabled;
        changeList.push(componentId);
      }
    });

    return changes;
  }

  static validateVersion(version: string): boolean {
    return /^\d+\.\d+\.\d+$/.test(version);
  }
}