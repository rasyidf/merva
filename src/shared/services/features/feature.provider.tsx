import { createBrowserRouter, RouterProvider } from "react-router";
import { useMemo, Suspense, type PropsWithChildren } from "react";
import { useEnabledFeatures } from "./feature.store";
import { processFeatures } from "./feature.utils";

const ErrorBoundary = ({ children }: PropsWithChildren) => {
  try {
    return children;
  } catch (error) {
    console.error("Router error:", error);
    return <div>Something went wrong</div>;
  }
};

/**
 * Renders the main router for the application with proper error handling and loading states.
 */
export function FeatureProvider() {
  const enabledFeatures = useEnabledFeatures();
  const { routes } = useMemo(() => processFeatures(enabledFeatures), [enabledFeatures]);
  
  const router = useMemo(
    () => createBrowserRouter(routes, {
      future: {
        // Enable v7 behaviors
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
      }
    }),
    [routes]
  );

  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Loading app...</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </ErrorBoundary>
  );
}

export default FeatureProvider;
