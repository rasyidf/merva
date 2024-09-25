import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { RouteObject } from "react-router-dom";
import { FeatureMetadata } from "@/shared/types";

const ShellMetadata = {
  id: "admin",
  name: "admin",
  enabled: true,
  routes: [
    {
      path: "/app",
      Component: DashboardLayout,
      children: [
        {
          path: "/app/dashboard",
          async lazy() {
            const { Dashboard } = await import("./pages/dashboard");
            return { Component: Dashboard };
          },
        },
        {
          path: "/app/settings",
          async lazy() {
            const { Settings } = await import("./pages/settings");
            return { Component: Settings };
          },
        },
      ] as RouteObject[],
    },
  ] satisfies RouteObject[],
  activeVersion: "1.0.0",
} satisfies FeatureMetadata;

export default ShellMetadata;
