import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { RouteConfig } from "@/types/RouteConfig";
import { useFeatureFlags } from "../contexts/FeatureProvider";
import ShellMetadata from "../features/Shell";
import { useMemo } from "react";

/**
 * Renders the main router for the application.
 */
function MainRouter(): JSX.Element {
	const { enabledFeatures } = useFeatureFlags();

	const enabledRoutes: RouteConfig[] = useMemo(() => {
		const shellRoutes: RouteConfig[] = enabledFeatures.filter((x) => x.placement === "shell").flatMap(feature => feature.routes ?? []);
		const featureRoutes: RouteConfig[] = enabledFeatures.filter((x) => !x.placement || (x.placement === "feature")).flatMap(feature => feature.routes ?? []);
		const root: RouteConfig = { ...ShellMetadata.routes[0], children: [...ShellMetadata.routes[0].children ?? [], ...featureRoutes] };
		return [root, ...shellRoutes];
	}, [enabledFeatures]);


	const router = createBrowserRouter(enabledRoutes);

	return <RouterProvider router={router} />;
}

export default MainRouter;
