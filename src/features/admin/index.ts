import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { RouteObject } from "react-router-dom";
import { FeatureMetadata } from "@/shared/types/FeatureMetadata";

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
            const { Dashboard } = await import("./pages/Dashboard");
            return { Component: Dashboard };
          },
        },
      ] as RouteObject[],
    },
  ] satisfies RouteObject[],
  activeVersion: "1.0.0", // Set the active version for A/B testing or staging
} satisfies FeatureMetadata;

export default ShellMetadata;
