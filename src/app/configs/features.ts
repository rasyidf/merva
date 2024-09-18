import FeatureA from "@/features/crud-feature";
import FeatureB from "@/features/feature-b";
import FeatureC from "@/features/feature-c";
import Management from "@/features/management";
import AuthFeature from "@/features/auth";
import Marketing from "@/features/marketing";

import { type FeatureMetadata } from "@/shared/types/FeatureMetadata";

const featuresRegistry = [
  Marketing,
  FeatureA, // TableFeature
  FeatureB, // ListFeature
  FeatureC,
  Management, // SettingsFeature
  AuthFeature,
] satisfies FeatureMetadata[];

export default featuresRegistry;
