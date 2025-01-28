import type { FeatureMetadata } from "@/shared/types";
import type { RouteObject } from "react-router-dom";

const ShellMetadata = {
  id: "admin",
  name: "admin",
  enabled: true,
  routes: [
    {
      path: "/app/dashboard",
      async lazy() {
        const { Dashboard } = await import("./pages/dashboard");
        return { Component: Dashboard };
      },
    },
    {
      path: "/app/settings/:tab?",
      async lazy() {
        const { Settings } = await import("./pages/settings");
        return { Component: Settings };
      },
    },
  ] satisfies RouteObject[],
  activeVersion: "1.0.0",
  navigation: [
    {
      id: "dashboard",
      title: "Dashboard",
      icon: "gauge",
      path: "/app/dashboard",
    }
  ]
} satisfies FeatureMetadata;

export default ShellMetadata;
