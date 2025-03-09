import type { FeatureMetadata } from "@/shared/types";
import type { RouteObject } from "react-router-dom";

const ShellMetadata = {
  id: "admin",
  name: "admin",
  placement: "app",
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
      id: "dashboards",
      title: "Dashboards",
      icon: "gauge",
      placement: "top",
      children: [
        {
          id: "default-dashboard",
          title: "Task Management",
          path: "/app/dashboard",
        },
        {
          id: "property-dashboard",
          title: "Property Management",
          path: "/app/dashboard?type=property",
        },
        {
          id: "teaching-dashboard",
          title: "Teaching Portal",
          path: "/app/dashboard?type=teaching",
        },
        {
          id: "vet-dashboard",
          title: "Vet Store",
          path: "/app/dashboard?type=vet",
        }
      ]
    },
    {
      id: "settings",
      title: "Settings",
      icon: "settings",
      placement: "bottom",
      path: "/app/settings",
    }
  ]
} satisfies FeatureMetadata;

export default ShellMetadata;
