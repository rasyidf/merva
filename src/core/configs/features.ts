import CrudFeature from "@/features/crud-feature";
import AuthFeature from "@/features/auth";
import Marketing from "@/features/marketing";
import Admin from "@/features/admin";

import type { FeatureMetadata } from "@/shared/types";

const featuresRegistry = [
  Admin,
  Marketing,
  CrudFeature,
  AuthFeature,
] satisfies FeatureMetadata[];

export default featuresRegistry;
