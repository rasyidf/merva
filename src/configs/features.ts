import FeatureA from "@/features/FeatureA";
import FeatureB from "@/features/FeatureB";
import FeatureC from "@/features/FeatureC";
import Settings from "@/features/Settings";
import AuthFeature from "@/features/Auth";

import { type FeatureMetadata } from "@/types/FeatureMetadata";
import Landing from "@/features/Landing";

const featuresRegistry = [
  Landing,
  FeatureA, // TableFeature
  FeatureB, // ListFeature
  FeatureC,
  Settings, // SettingsFeature
  AuthFeature,
] satisfies FeatureMetadata[];

export default featuresRegistry;
