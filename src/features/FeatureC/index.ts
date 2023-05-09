import { FeatureMetadata } from "@/types/FeatureMetadata";
import { VersionConfig } from "@/types/VersionConfig";
import { RouteObject } from "react-router-dom";

const FeatureC = {
    id: 'FeatureC',
    name: 'Feature C',
    enabled: true, // Feature flag to enable/disable the entire feature
    routes: [{
        path: '/feature-c',
        async lazy() {
            let { FeatureC } = await import("./pages/FeatureC");
            return { Component: FeatureC };
        },
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
    activeVersion: '1.1.0', // Set the active version for A/B testing or staging
} satisfies FeatureMetadata;

export default FeatureC;