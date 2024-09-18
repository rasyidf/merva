import { FeatureMetadata } from "@/shared/types/FeatureMetadata";
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
} satisfies FeatureMetadata;
