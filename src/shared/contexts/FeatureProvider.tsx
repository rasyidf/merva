import { featureRegistry } from "@/app/configs";
import ShellMetadata from "@/features/admin";
import { RouteObject } from "react-router-dom";
import { create } from "zustand";
import { logger } from "../services";
import { ErrorBoundary } from "../services/features/ErrorBoundary";
import { FeatureMetadata } from "../types/FeatureMetadata";
import { RouteConfig } from "../types/RouteConfig";


type FeatureFlagsStore = {
  enabledFeatures: FeatureMetadata[];
  getEnabledRoutes: (enabledFeatures: FeatureMetadata[]) => RouteConfig[];
};

export const isFeatureEnabled = (feature: FeatureMetadata) =>
  feature.enabled || feature?.enabled === undefined || feature?.enabled;

export const useFeatureFlagsStore = create<FeatureFlagsStore>((set, get) => ({
  enabledFeatures: featureRegistry.filter(isFeatureEnabled) as FeatureMetadata[],
  getEnabledRoutes: (enabledFeatures) => {
    const shellRoutes: RouteObject[] = enabledFeatures
      .filter((x) => x.placement && x.placement === "shell")
      .flatMap((feature) => feature.routes ?? []);

    const featureRoutes: RouteObject[] = enabledFeatures
      .filter((x) => !x.placement || x.placement === "feature")
      .flatMap((feature) => feature.routes ?? []);

    const rootRoute: RouteObject = {
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
      ErrorBoundary: ErrorBoundary,
      children: [...(shellAppRoute.children ?? []), ...featureRoutes],
    };

    // set the app route as the root route's children
    rootRoute.children = [...(shellRoutes ?? []), appRoute];

    return [rootRoute];
  },
}));

export const useFeatureFlags = () => useFeatureFlagsStore.getState();
