import { FeatureMetadata } from "@/types/FeatureMetadata";
import { NavigationConfig } from "@/types/NavigationConfig";
import { VersionConfig } from "@/types/VersionConfig";
import { RouteObject } from "react-router-dom";

export default {
  id: "landing",
  name: "landing page",
  enabled: true,
  routes: [
    {
      path: "/",
      lazy: () => import("./pages/LandingPage"),
    },
  ] satisfies RouteObject[],
  placement: "shell",
} as const satisfies FeatureMetadata;
