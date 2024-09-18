import { createBrowserRouter, RouteObject, RouterProvider } from "react-router-dom";

import { RouteConfig } from "@/shared/types/RouteConfig";
import { useMemo } from "react";
import ShellMetadata from "@/features/admin";
import { useFeatureFlags } from "./FeatureProvider";

/**
 * Renders the main router for the application.
 */
export function RouteProvider(): JSX.Element {
  const { enabledFeatures } = useFeatureFlags();

  const enabledRoutes: RouteObject[] = useMemo(() => {
    const shellRoutes: RouteObject[] = enabledFeatures
      .filter((x) => x.placement && x.placement === "shell")
      .flatMap((feature) => feature.routes ?? []);

    const featureRoutes: RouteObject[] = enabledFeatures
      .filter((x) => !x.placement || x.placement === "feature")
      .flatMap((feature) => feature.routes ?? []);

    const rootRoute: RouteObject = {
      path: "/",
    };

    if (!rootRoute) {
      console.error("Could not create root route in shell");
      throw new Error("Could not create root route in shell");
    }

    const shellAppRoute = ShellMetadata.routes[0];

    if (!shellAppRoute) {
      console.error("Could not find app route in shell");
      throw new Error("Could not find app route in shell");
    }

    const appRoute: RouteConfig = {
      ...shellAppRoute,
      children: [...(shellAppRoute.children ?? []), ...featureRoutes],
    };

    // set the app route as the root route's children
    rootRoute.children = [appRoute, ...(shellRoutes ?? [])];

    return [rootRoute];
    // set the shell routes as the app route's children
  }, [enabledFeatures]);

  const router = createBrowserRouter(enabledRoutes, { basename: "/" });

  return <RouterProvider router={router} />;
}

export default RouteProvider;
