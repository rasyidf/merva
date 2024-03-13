import { FeatureMetadata } from "@/types/FeatureMetadata";
import { NavigationConfig } from "@/types/NavigationConfig";
import { VersionConfig } from "@/types/VersionConfig";
import { RouteObject } from "react-router-dom";
import { ListPlus } from "@phosphor-icons/react";

const baseUrl = "/app/products";
const FeatureBMetadata = {
  id: "entity-b",
  name: "List Feature",
  group: "Products",
  enabled: true,
  routes: [
    {
      path: `${baseUrl}/entity-b`,
      async lazy() {
        const { FeatureB } = await import("./pages/FeatureB");
        return { Component: FeatureB };
      },
    },
  ] satisfies RouteObject[],
  navigation: [
    {
      id: "entity-b",
      title: "List Feature",
      path: `${baseUrl}/entity-b`,
      icon: <ListPlus weight="duotone" />
    },
  ] satisfies NavigationConfig[],
  activeVersion: "1.1.0", // Set the active version for A/B testing or staging
} satisfies FeatureMetadata;

export default FeatureBMetadata;
