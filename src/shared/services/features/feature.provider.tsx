import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useMemo } from "react";
import { useEnabledFeatures } from "./feature.store";
import { processFeatures } from "./feature.utils";

/**
 * Renders the main router for the application.
 */
export function FeatureProvider() {
  const enabledFeatures = useEnabledFeatures();
  const router = useMemo(() => {
    const { routes } = processFeatures(enabledFeatures);
    return createBrowserRouter(routes);
  }, [enabledFeatures]);

  return <RouterProvider router={router} />;
}

export default FeatureProvider;
