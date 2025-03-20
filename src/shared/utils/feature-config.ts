import type { FeatureMetadata, NavigationConfig, RouteConfig } from "@/shared/types";
import { IconName } from "@/shared/assets/icons/types";

interface CreateFeatureOptions {
  id: string;
  name: string;
  enabled?: boolean;
  placement?: string;
  group?: string;
  icon?: IconName;
  routes?: RouteConfig[];
  navigation?: NavigationConfig[];
  version?: string;
}

export function createFeature(options: CreateFeatureOptions): FeatureMetadata {
  return {
    id: options.id,
    name: options.name,
    enabled: options.enabled ?? true,
    placement: options.placement ?? 'app',
    group: options.group,
    icon: options.icon,
    routes: options.routes ?? [],
    navigation: options.navigation ?? [],
    activeVersion: options.version ?? '1.0.0'
  };
}

export function createFeatureRoute(path: string, importFn: () => Promise<any>): RouteConfig {
  return {
    path,
    async lazy() {
      const module = await importFn();
      return { Component: module.Component };
    }
  };
}

export function createFeatureNavItem(options: Partial<NavigationConfig> & Pick<NavigationConfig, 'id' | 'title'>): NavigationConfig {
  return {
    id: options.id,
    title: options.title,
    path: options.path,
    icon: options.icon,
    group: options.group,
    placement: options.placement ?? 'top',
    disabled: options.disabled,
    children: options.children,
  };
}