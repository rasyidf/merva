import { featureRegistry } from "@/app/configs";
import ShellMetadata from "@/features/admin";
import logger from "@/shared/services/logging";
import { FeatureMetadata } from "@/shared/types/FeatureMetadata";
import { RouteConfig } from "@/shared/types/RouteConfig";
import { create } from "zustand";

type FeatureFlagsStore = {
  activeVersion: string;
  setActiveVersion: (version: string) => void;
  enabledFeatures: FeatureMetadata[];
  getEnabledRoutes: (enabledFeatures: FeatureMetadata[]) => RouteConfig[];
};

export const isFeatureEnabled = (feature: FeatureMetadata) =>
  feature.enabled || feature?.enabled === undefined || feature?.enabled;

// Create a Zustand store
const useFeatureFlagsStore = create<FeatureFlagsStore>((set) => ({
  activeVersion: "1.0.0",
  setActiveVersion: (version) => set({ activeVersion: version }),
  enabledFeatures: featureRegistry.filter(isFeatureEnabled) as FeatureMetadata[],
  getEnabledRoutes: (enabledFeatures) => {
    const shellRoutes: RouteConfig[] = enabledFeatures
      .filter((x) => x.placement && x.placement === "shell")
      .flatMap((feature) => feature.routes ?? []);

    const featureRoutes: RouteConfig[] = enabledFeatures
      .filter((x) => !x.placement || x.placement === "feature")
      .flatMap((feature) => feature.routes ?? []);

    const rootRoute: RouteConfig = {
      path: "/",
    };

    if (!rootRoute) {
      logger.error("Could not create root route in shell");
      throw new Error("Could not create root route in shell");
    }

    const shellAppRoute = ShellMetadata.routes[0];

    if (!shellAppRoute) {
      logger.error("Could not find app route in shell");
      throw new Error("Could not find app route in shell");
    }

    const appRoute: RouteConfig = {
      ...shellAppRoute,
      children: [...(shellAppRoute.children ?? []), ...featureRoutes],
    };

    // set the app route as the root route's children
    rootRoute.children = [...(shellRoutes ?? []), appRoute];

    return [rootRoute];
  },
}));

export const useFeatureFlags = () => {
  return useFeatureFlagsStore.getState();
};
