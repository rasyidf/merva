import FeatureA from './features/FeatureA';
import FeatureB from './features/FeatureB';
import FeatureC from './features/FeatureC';
import { type FeatureMetadata } from './types/FeatureMetadata';

const featuresRegistry = [
  FeatureA,
  FeatureB,
  FeatureC
] satisfies FeatureMetadata[];

export default featuresRegistry;