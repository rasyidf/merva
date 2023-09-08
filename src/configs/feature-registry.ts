import FeatureA from "@/features/FeatureA";
import FeatureB from "@/features/FeatureB";
import AuthFeature from "@/features/Auth";

import { type FeatureMetadata } from "@/types/FeatureMetadata";

const featuresRegistry = [
	FeatureA, // DashboardFeature
	FeatureB, // SettingsFeature,
	AuthFeature,
] satisfies FeatureMetadata[];

export default featuresRegistry;
