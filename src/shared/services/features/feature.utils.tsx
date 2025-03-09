import ShellMetadata from "@/features/admin";
import type { IconName } from "@/shared/assets/icons/types";
import { DashboardLayout } from "@/shared/components/layouts/DashboardLayout";
import { SvgIcon } from "@/shared/components/ui/icon";
import type { FeatureMetadata, NavigationConfig } from "@/shared/types";
import type { RouteObject } from "react-router-dom";
import {
  Page401,
  Page403,
  Page404,
  Page500,
  Page503,
} from "@/shared/shell/pages";

const errorRoutes: RouteObject[] = [
  { path: "/401", Component: Page401 },
  { path: "/403", Component: Page403 },
  { path: "/500", Component: Page500 },
  { path: "/503", Component: Page503 },
  { path: "*", Component: Page404 },
];

export function processFeatures(enabledFeatures: FeatureMetadata[]): {
  routes: RouteObject[];
  navItems: NavigationConfig[];
} {
  // Split features based on placement
  const shellFeatures = enabledFeatures.filter(f => f.placement === "shell");
  const appFeatures = enabledFeatures.filter(f => !f.placement || f.placement === "app");
  const hiddenFeatures = enabledFeatures.filter(f => f.placement === "hidden");

  // Generate routes
  const shellRoutes = shellFeatures.flatMap(feature => feature.routes ?? []);
  const appRoutes = [...appFeatures, ...hiddenFeatures].flatMap(feature => feature.routes ?? []);

  const rootRoute: RouteObject = {
    path: "/",
    children: [
      {
        path: "/app",
        Component: DashboardLayout,
        children: appRoutes,
      },
      ...shellRoutes,
      ...errorRoutes,
    ],
    HydrateFallback: () => <div></div>,
  };

  // Generate navigation items - only include app features that should be in sidebar
  const navItems = appFeatures
    .filter(feature => feature.enabled !== false)
    .flatMap((feature) => {
      if (feature.navigation?.length) {
        return feature.navigation.map((navItem) => ({
          ...navItem,
          group: feature.group,
          disabled: !feature.enabled,
        }));
      }

      // Generate default navigation if none provided
      return feature.routes?.length ? [{
        id: feature.id,
        title: feature.name ?? feature.id,
        path: feature.routes?.[0]?.path ?? "#",
        icon: feature.icon ? (
          typeof feature.icon === "string" ? (
            <SvgIcon name={feature.icon as IconName} />
          ) : (
            feature.icon
          )
        ) : (
          <SvgIcon name="square" />
        ),
        group: feature.group,
        disabled: !feature.enabled,
      }] : [];
    });

  // Group navigation items
  const groupedNavItems = navItems.reduce<Record<string, NavigationConfig[]>>((acc, item) => {
    const group = item.group ?? "ungrouped";
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(item);
    return acc;
  }, {});

  // Convert groups to parent nav items
  const finalNavItems = Object.entries(groupedNavItems).flatMap(([groupKey, items]) =>
    groupKey === "ungrouped" ? items : {
      id: groupKey,
      title: groupKey,
      children: items,
    } as NavigationConfig
  );

  return { routes: [rootRoute], navItems: finalNavItems };
}