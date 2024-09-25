import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { useMemo } from "react";
import { buildRoutes } from "../services/features/feature-route";
import { useEnabledFeatures } from "../services/features/feature-store";

/**
 * Renders the main router for the application.
 */
export function RouteProvider(): JSX.Element {
  const enabledFeatures = useEnabledFeatures();
  const routes = useMemo(() => buildRoutes(enabledFeatures), [enabledFeatures]);
  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
}


export default RouteProvider;
