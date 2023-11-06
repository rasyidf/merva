import { Navigate, RouteObject } from "react-router-dom";
import { FeatureMetadata } from "@/types/FeatureMetadata";
import { VersionConfig } from "@/types/VersionConfig";

const AuthFeatureMetadata = {
	id: "Auth",
	name: "Authentication Feature",
	enabled: true,
	placement: "shell",
	routes: [
		{
			path: "/app/login",
			async lazy() {
				const { default: LoginPage } = await import("./pages/Login");
				return { Component: LoginPage };
			},
		},
		{
			path: "/app/logout",
			element: <Navigate to="/app/login" />,
		}
	] as RouteObject[],

} satisfies FeatureMetadata;

export default AuthFeatureMetadata;
