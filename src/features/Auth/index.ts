import { RouteObject } from "react-router-dom";
import { FeatureMetadata } from "@/types/FeatureMetadata";
import { VersionConfig } from "@/types/VersionConfig";

const AuthFeatureMetadata = {
	id: "Auth",
	name: "Authentication Feature",
	enabled: true,
	placement: "shell",
	routes: [
		{
			path: "/login",
			async lazy() {
				const { default: LoginPage } = await import("./pages/Login");
				return { Component: LoginPage };
			},
		},
	] as RouteObject[],
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

export default AuthFeatureMetadata;
