import { createFeature, createFeatureRoute, createFeatureNavItem } from "@/shared/utils/feature-config";
import { compose } from "@/shared/utils";

// Define routes with type safety
const routes = [
  createFeatureRoute("/app/crud", () => import("./pages/list")),
  createFeatureRoute("/app/crud/details/:id", () => import("./pages/details")),
  createFeatureRoute("/app/crud/create", () => import("./pages/create")),
  createFeatureRoute("/app/crud/edit/:id", () => import("./pages/edit")),
];

// Define navigation items with type safety
const navigation = [
  createFeatureNavItem({
    id: "crud-list",
    title: "CRUD Management",
    icon: "fileSpreadsheet",
    path: "/app/crud",
  })
];

// Create feature metadata
export const CrudFeatureMetadata = createFeature({
  id: "crud-feature",
  name: "CRUD Management",
  enabled: true,
  placement: "app",
  icon: "fileSpreadsheet",
  routes,
  navigation,
  version: "1.0.0"
});

export default CrudFeatureMetadata;

// Export components and utilities
export * from './pages';
export * from './components';
export * from './services';
export * from './utils';
