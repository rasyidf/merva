import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useMemo } from "react";
import { useEnabledFeatures } from "./feature.store";
import { processFeatures } from "./feature.utils";

/**
 * Renders the main router for the application.
 */
export function FeatureProvider() {
  const enabledFeatures = useEnabledFeatures();
  const { routes } = useMemo(() => processFeatures(enabledFeatures), [enabledFeatures]);
  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
}

export default FeatureProvider;
