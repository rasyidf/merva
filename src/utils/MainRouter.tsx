import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { RouteConfig } from "@/types/RouteConfig";
import { useFeatureFlags } from "../contexts/FeatureProvider";
import ShellMetadata from "../features/Shell";
import { useMemo } from "react";

/**
 * Renders the main router for the application.
 *
 * @returns {JSX.Element} The router provider component.
 */
function MainRouter(): JSX.Element {
	const { enabledFeatures } = useFeatureFlags();

	const enabledRoutes: RouteConfig[] = useMemo(() => {
		const routes: RouteConfig[] = [];
		for (let i = 0; i < enabledFeatures.length; i++) {
			const feature = enabledFeatures[i];
			const featureRoutes = feature.routes;
			if (featureRoutes && feature.enabled) {
				routes.push(...featureRoutes);
			}
		}

		ShellMetadata.routes[0].children.push(...routes);
		return [...ShellMetadata.routes];
	}, [enabledFeatures]);

	const router = createBrowserRouter(enabledRoutes);

	return <RouterProvider router={router} />;
}

export default MainRouter;
