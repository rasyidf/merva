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
    {
      path: "/docs",
      lazy: () => import("./pages/docsPage"),
    },
    {
      path: "/portfolio",
      lazy: () => import("./pages/portfolioPage"),
    }
  ] satisfies RouteObject[],
  placement: "shell",
  locales: [
    {
      lang: "en",
      resources: () => import("./locales/en.json"),
    },
    {
      lang: "id",
      resources: () => import("./locales/id.json"),
    },
  ]
} satisfies FeatureMetadata;

export default MarketingMetadata;
