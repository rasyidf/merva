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
  group?: string;
  enabled?: boolean;
  routes?: RouteConfig[];
  navigation?: NavigationConfig[];
  versions?: VersionConfig[];
  activeVersion?: string;
  icon?: string | ReactNode;
  description?: string;
  metadata?: { [key: string]: any; };
  placement?: "shell" | "hidden" | "none";
}
