import type { FeatureMetadata } from "@/shared/types";
import type { RouteObject } from "react-router-dom";
const MarketingMetadata = {
  id: "landing",
  name: "landing page",
  enabled: true,
  routes: [
    {
      path: "/",
      lazy: () => import("./pages/landingPage"),
    },
  ] satisfies RouteObject[],
  placement: "shell",
} satisfies FeatureMetadata;

export default MarketingMetadata;
