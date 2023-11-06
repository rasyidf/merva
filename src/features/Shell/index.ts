import { RouteObject } from "react-router-dom";
import { FeatureMetadata } from "../../types/FeatureMetadata";
import { VersionConfig } from "../../types/VersionConfig";

const ShellMetadata = {
	id: "Shell",
	name: "Shell",
	enabled: true,
	routes: [
		{
			path: "/app",
			async lazy() {
				const { DashboardLayout: Dashboard } = await import("@/components/layouts/DashboardLayout");
				return { Component: Dashboard };
			},
			children: [
				{
					path: "/app/dashboard",
					async lazy() {
						const { Dashboard } = await import("./pages/Dashboard");
						return { Component: Dashboard };
					},
				},
			] as RouteObject[],
		},
	] satisfies RouteObject[],
	activeVersion: "1.0.0", // Set the active version for A/B testing or staging
} satisfies FeatureMetadata;

export default ShellMetadata;
