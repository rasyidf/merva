 
import ShellMetadata from "@/features/admin";
import { FeatureMetadata } from "@/shared/types";
import { RouteObject } from "react-router-dom";

export function buildRoutes(enabledFeatures: FeatureMetadata[]): RouteObject[] {
  const shellRoutes = enabledFeatures
    .filter((feature) => feature.placement === "shell")
    .flatMap((feature) => feature.routes ?? []);

  const featureRoutes = enabledFeatures
    .filter((feature) => feature.placement !== "shell")
    .flatMap((feature) => feature.routes ?? []);

  const rootRoute: RouteObject = {
    path: "/",
    children: [
      {
        ...ShellMetadata.routes[0],
        children: [
          ...(ShellMetadata?.routes?.[0]?.children ?? []),
          ...featureRoutes,
        ],
      },
      ...shellRoutes,
    ],
  };

  return [rootRoute];
}
