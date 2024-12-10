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

export function processFeatures(enabledFeatures: FeatureMetadata[]): {
  routes: RouteObject[];
  navItems: NavigationConfig[];
} {
  // Generate routes
  const shellRoutes = enabledFeatures
    .filter((feature) => feature.placement === "shell")
    .flatMap((feature) => feature.routes ?? []);

  const featureRoutes = enabledFeatures
    .filter((feature) => feature.placement !== "shell")
    .flatMap((feature) => feature.routes ?? []);

  const errorRoutes: RouteObject[] = [
    { path: "/401", Component: Page401 },
    { path: "/403", Component: Page403 },
    { path: "/404", Component: Page404 },
    { path: "/500", Component: Page500 },
    { path: "/503", Component: Page503 },
    { path: "*", Component: Page404 },
  ];

  const rootRoute: RouteObject = {
    path: "/",
    children: [
      {
        path: "/app",
        Component: DashboardLayout,
        children: featureRoutes,
      },
      ...shellRoutes,
      ...errorRoutes,
    ],
  };

  const routes = [rootRoute];

  // Generate navigation items
  const navItems: NavigationConfig[] = enabledFeatures
    .filter(
      (feature) =>
        !feature.placement || (feature.placement && !["shell", "hidden", "none"].includes(feature.placement)),
    )
    .flatMap((feature) => {
      if (feature.navigation && feature.navigation.length > 0) {
        return feature.navigation.map((navItem) => ({
          ...navItem,
          group: feature.group,
          disabled: !feature.enabled,
          visible: feature.placement !== "hidden",
        }));
      }

      if (feature.placement !== "hidden") {
        return [];
      }

      return [
        {
          id: feature.id,
          title: feature.name,
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
        } as NavigationConfig,
      ];
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

  const finalNavItems = Object.entries(groupedNavItems).flatMap(([groupKey, items]) => {
    if (groupKey === "ungrouped") {
      return items;
    }
    return {
      id: groupKey,
      title: groupKey,
      children: items,
    } as NavigationConfig;
  });

  return { routes, navItems: finalNavItems };
}