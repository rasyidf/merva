import { FeatureMetadata } from "@/types/FeatureMetadata";
import { NavigationConfig } from "@/types/NavigationConfig";
import { VersionConfig } from "@/types/VersionConfig";
import { RouteObject } from "react-router-dom";
import { ListPlus, MapPin } from "@phosphor-icons/react";

const baseUrl = "/app/products";
const FeatureCMetadata = {
  id: "entity-c",
  name: "Tracking Map",
  group: "Products",
  enabled: true,
  routes: [
    {
      path: `${baseUrl}/entity-c`,
      async lazy() {
        const { FeatureC } = await import("./pages/FeatureC");
        return { Component: FeatureC };
      },
    },
  ] satisfies RouteObject[],
  navigation: [
    {
      id: "tracking-map",
      title: "Map",
      path: `${baseUrl}/entity-c`,
      icon: <MapPin weight="duotone" />
    },
  ] satisfies NavigationConfig[],
  activeVersion: "1.1.0", // Set the active version for A/B testing or staging
} satisfies FeatureMetadata;

export default FeatureCMetadata;
