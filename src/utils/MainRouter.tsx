import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Route } from '@/types/RouteConfig';
import { useFeatureFlags } from '../contexts/FeatureProvider';
import ShellMetadata from '../features/Shell';

function MainRouter() {
  const { enabledFeatures } = useFeatureFlags();

  // Create routes based on the enabled features
  // foreach enabledConfig, append route array from feature.routes into routes
  const routes: Route[] = [];

  const featureRoutes = enabledFeatures.reduce<Route[]>((routes, feature, i,) => {
    const route = feature.routes;
    if (route) {
      routes.push(...route);
    }
    return routes;
  }, []);
  ShellMetadata.routes[0].children = featureRoutes;
  // Add other global routes here
  // routes.push({ path: '/global-route', element: <GlobalComponent /> });
  routes.push(...ShellMetadata.routes);
  const router = createBrowserRouter(routes);

  return (
    <RouterProvider router={router} />
  );
}

export default MainRouter;