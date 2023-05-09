import FeatureA from './features/FeatureA';
import FeatureB from './features/FeatureB';
import FeatureC from './features/FeatureC';
import FeatureD from './features/FeatureD';
import FeatureE from './features/FeatureE';

//expose
import { type FeatureMetadata } from './types/FeatureMetadata';

const featuresRegistry = [
  FeatureA,
  FeatureB,
  FeatureC,
  FeatureD,
  FeatureE
] satisfies FeatureMetadata[];

export default featuresRegistry;