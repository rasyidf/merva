import type { FeatureMetadata } from "@/shared/types";
import type { RouteObject } from "react-router-dom";

const MarketingMetadata = {
  id: "landing",
  name: "landing page",
  enabled: true,
  routes: [
    {
      path: "/",
      lazy: async () => {
        const { Component } = await import("./pages/landingPage");
        return { Component };
      },
    },
    {
      path: "/docs",
      lazy: async () => {
        const { Component } = await import("./pages/docsPage");
        return { Component };
      },
    },
    {
      path: "/portfolio",
      lazy: async () => {
        const { Component } = await import("./pages/portfolioPage");
        return { Component };
      },
    }
  ] satisfies RouteObject[],
  placement: "shell",
  locales: [
    {
      lang: "en",
      resources: async () => await import("./locales/en.json"),
    },
    {
      lang: "id",
      resources: async () => await import("./locales/id.json"),
    },
  ]
} satisfies FeatureMetadata;

export default MarketingMetadata;
