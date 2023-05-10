import { RouteObject } from "react-router-dom";
import { FeatureMetadata } from "../../types/FeatureMetadata";
import { VersionConfig } from "../../types/VersionConfig";

const ShellMetadata = {
    id: 'Shell',
    name: 'Shell',
    enabled: true, // Feature flag to enable/disable the entire feature
    routes: [{
        path: '/',
        async lazy() {
            let { Dashboard } = await import("./pages/AppShell");
            return { Component: Dashboard };
        },
        children: [
            {
                path: '/',
                async lazy() {
                    let { Dashboard } = await import("./pages/Dashboard");
                    return { Component: Dashboard };
                }
            }
        ] as RouteObject[],
    }] satisfies RouteObject[],
    versions: [
        {
            version: '1.0.0',
            components: {
                FeatureAComponent1: true,
                FeatureAComponent2: false,
            },
        },
    ] as VersionConfig[],
    activeVersion: '1.0.0', // Set the active version for A/B testing or staging
} satisfies FeatureMetadata;

export default ShellMetadata;