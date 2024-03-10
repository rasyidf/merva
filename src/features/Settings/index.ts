import { FeatureMetadata } from "@/types/FeatureMetadata";
import { VersionConfig } from "@/types/VersionConfig";
import { RouteObject } from "react-router-dom";

const SettingsMetadata = {
  id: "Settings",
  name: "Settings",
  enabled: true,
  placement: "feature",
  routes: [
    {
      path: "/app/settings",
      async lazy() {
        const { Settings } = await import("./pages/settings");
        return { Component: Settings };
      },
    },
  ] satisfies RouteObject[],
  navigation: [],
  versions: [
    {
      version: "1.0.0",
      components: {
        FeatureAComponent1: true,
        FeatureAComponent2: false,
      },
    },
    {
      version: "1.1.0",
      components: {
        FeatureAComponent1: true,
        FeatureAComponent2: true,
      },
    },
  ] as VersionConfig[],
  activeVersion: "1.1.0", // Set the active version for A/B testing or staging
} satisfies FeatureMetadata;

export default SettingsMetadata;
