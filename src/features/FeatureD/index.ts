import { FeatureMetadata } from "@/types/FeatureMetadata";
import { VersionConfig } from "@/types/VersionConfig";
import { RouteObject } from "react-router-dom";

const FeatureD = {
    id: 'FeatureD',
    name: 'Feature D',
    enabled: true, // Feature flag to enable/disable the entire feature
    routes: [{
        path: '/feature-d',
        async lazy() {
            let { FeatureD } = await import("./pages/FeatureD");
            return { Component: FeatureD };
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
    activeVersion: '1.0.0', // Set the active version for A/B testing or staging
} satisfies FeatureMetadata;

export default FeatureD;