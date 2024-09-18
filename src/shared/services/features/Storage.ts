import { FeatureMetadata } from "@/shared/types/FeatureMetadata";

export interface Storage {
  getFeatures: () => FeatureMetadata[];
  setFeatures: (features: FeatureMetadata[]) => void;
}
