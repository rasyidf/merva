import { RouteConfig } from "./RouteConfig";
import { VersionConfig } from "./VersionConfig";
import { NavigationConfig } from "./NavigationConfig";
import { ReactNode } from "react";

export type FeatureGroup = {
  title: ReactNode;
  icon: ReactNode;
};

export interface FeatureMetadata {
  id: string;
  name: string;
  group?: string | FeatureGroup;
  enabled?: boolean | undefined;
  placement?: "shell" | "feature" | "hidden" | "none";
  routes?: RouteConfig[];
  navigation?: NavigationConfig[];
  versions?: VersionConfig[];
  activeVersion?: string;
}
