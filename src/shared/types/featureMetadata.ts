import type { RouteConfig } from "./routeConfig";
import type { VersionConfig } from "./versionConfig";
import type { NavigationConfig } from "./navigationConfig";
import type { ReactNode } from "react";

export type FeatureGroup = {
  id: string;
  title: ReactNode;
  icon?: ReactNode;
};

export type LocalizationConfig = {
  lang: string;
  resources: () => Promise<{ default: Record<string, any> }>;
}


export interface FeatureMetadata {
  id: string;
  name?: string;
  activeVersion?: string;
  description?: string;
  enabled?: boolean;
  group?: string;
  icon?: string | ReactNode;
  metadata?: { [key: string]: any; };
  placement?: "shell" | "hidden" | "none";
  navigation?: NavigationConfig[];
  locales?: LocalizationConfig[];
  routes?: RouteConfig[];
  versions?: VersionConfig[];
}
