import FeatureA from "@/features/crud-feature";
import AuthFeature from "@/features/auth";
import Marketing from "@/features/marketing";

import type { FeatureMetadata } from "@/shared/types";

const featuresRegistry = [
  Marketing,
  FeatureA,
  AuthFeature,
] satisfies FeatureMetadata[];

export default featuresRegistry;
