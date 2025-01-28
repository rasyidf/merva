import { featureRegistry } from "@/core/configs";
import { create } from "zustand";
import type { FeatureMetadata } from "../../types/featureMetadata";

type FeatureFlagsStore = {
  enabledFeatures: FeatureMetadata[];
  setEnabledFeatures: (features: FeatureMetadata[]) => void;
};

export const isFeatureEnabled = (feature: FeatureMetadata) => feature.enabled !== false;

export const useFeatureFlagsStore = create<FeatureFlagsStore>((set) => ({
  enabledFeatures: featureRegistry.filter(isFeatureEnabled),
  setEnabledFeatures: (features) => set({ enabledFeatures: features }),
}));

const initialEnabledFeatures = featureRegistry.filter(isFeatureEnabled);

useFeatureFlagsStore.getState().setEnabledFeatures(initialEnabledFeatures);

export const useEnabledFeatures = () => useFeatureFlagsStore((state) => state.enabledFeatures);
