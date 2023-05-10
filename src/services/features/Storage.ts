import { FeatureMetadata } from '@/types/FeatureMetadata';


export interface Storage {
    getFeatures: () => FeatureMetadata[];
    setFeatures: (features: FeatureMetadata[]) => void;
}
