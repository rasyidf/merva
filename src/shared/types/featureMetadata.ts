import type { RouteConfig } from "./routeConfig";
import type { VersionConfig } from "./versionConfig";
import type { NavigationConfig } from "./navigationConfig";
import type { ReactNode } from "react";

export type FeatureGroup = {
  id: string;
  title: ReactNode;
  icon?: ReactNode;
};

export interface FeatureMetadata {
  id: string;
  name: string;
  // Group can be a simple string or a more complex object for advanced grouping.
  group?: string;
  enabled?: boolean;
  // Explicitly defining all possible placements for clarity.
  placement?: "shell" | "feature" | "hidden" | "none";
  // Routes associated with the feature.
  routes?: RouteConfig[];
  // Navigation items specific to the feature.
  navigation?: NavigationConfig[];
  // Versioning information if applicable.
  versions?: VersionConfig[];
  // Currently active version of the feature.
  activeVersion?: string;
  // Additional properties for enhanced flexibility:
  icon?: string | ReactNode; // Icon associated with the feature.
  description?: string; // Description of the feature.
  visible?: boolean; // Visibility of the feature in the UI.
}
