import { createFeature, createFeatureRoute, createFeatureNavItem } from "@/shared/utils/feature-config";

// Define routes
const routes = [
  createFeatureRoute("/app/dashboard", () => import("./pages/dashboard")),
  createFeatureRoute("/app/settings/:tab?", () => import("./pages/settings")),
];

// Define navigation structure
const navigation = [
  createFeatureNavItem({
    id: "dashboards",
    title: "Dashboards",
    icon: "gauge",
    placement: "top",
    children: [
      createFeatureNavItem({
        id: "default-dashboard",
        title: "Task Management",
        path: "/app/dashboard",
      }),
      createFeatureNavItem({
        id: "property-dashboard",
        title: "Property Management",
        path: "/app/dashboard?type=property",
      }),
      createFeatureNavItem({
        id: "teaching-dashboard",
        title: "Teaching Portal",
        path: "/app/dashboard?type=teaching",
      }),
      createFeatureNavItem({
        id: "vet-dashboard",
        title: "Vet Store",
        path: "/app/dashboard?type=vet",
      }),
    ],
  }),
  createFeatureNavItem({
    id: "settings",
    title: "Settings",
    icon: "settings",
    placement: "bottom",
    path: "/app/settings",
  }),
];

// Create feature metadata
export const AdminFeatureMetadata = createFeature({
  id: "admin",
  name: "Admin",
  placement: "app",
  enabled: true,
  routes,
  navigation,
  version: "1.0.0"
});

export default AdminFeatureMetadata;

// Export feature components and utilities
export * from "./components";
export * from "./modules";
export * from "./pages";
export * from "./services";
