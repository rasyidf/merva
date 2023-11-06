import FeatureA from "@/features/FeatureA";
import FeatureB from "@/features/FeatureB";
import AuthFeature from "@/features/Auth";

import { type FeatureMetadata } from "@/types/FeatureMetadata";
import Landing from "@/features/Landing";

const featuresRegistry = [
	Landing,
	FeatureA, // DashboardFeature
	FeatureB, // SettingsFeature,
	AuthFeature,
] satisfies FeatureMetadata[];

export default featuresRegistry;
