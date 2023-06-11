import FeatureA from "@/features/FeatureA";
import FeatureB from "@/features/FeatureB";

import { type FeatureMetadata } from "@/types/FeatureMetadata";

const featuresRegistry = [
	FeatureA, // DashboardFeature
	FeatureB, // SettingsFeature
] satisfies FeatureMetadata[];

export default featuresRegistry;
