import { FeatureMetadata } from "@/types/FeatureMetadata";
import { VersionConfig } from "@/types/VersionConfig";
import { RouteObject } from "react-router-dom";

const FeatureBMetadata = {
	id: "FeatureB",
	name: "Feature B",
	enabled: true,
	routes: [
		{
			path: "/app/feature-b",
			async lazy() {
				const { FeatureB } = await import("./pages/FeatureB");
				return { Component: FeatureB };
			},
		},
	] satisfies RouteObject[],
	versions: [
		{
			version: "1.0.0",
			components: {
				FeatureAComponent1: true,
				FeatureAComponent2: false,
			},
		},
		{
			version: "1.1.0",
			components: {
				FeatureAComponent1: true,
				FeatureAComponent2: true,
			},
		},
	] as VersionConfig[],
	activeVersion: "1.1.0", // Set the active version for A/B testing or staging
} satisfies FeatureMetadata;

export default FeatureBMetadata;
