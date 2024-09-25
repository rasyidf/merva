import { FeatureMetadata } from "@/shared/types";
import { RouteObject } from "react-router-dom";
const MarketingMetadata = {
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

export default MarketingMetadata;