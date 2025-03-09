import { featureRegistry } from "@/core/configs";
import { create } from "zustand";
import type { FeatureMetadata } from "../../types/featureMetadata";

type FeatureFlagsStore = {
  enabledFeatures: FeatureMetadata[];
  setEnabledFeatures: (features: FeatureMetadata[]) => void;
  toggleFeature: (featureId: string) => void;
};

export const isFeatureEnabled = (feature: FeatureMetadata) => {
  // A feature is enabled if:
  // 1. It's not explicitly disabled
  // 2. It has a valid placement or is meant for the app
  return feature.enabled !== false && 
    (!feature.placement || ["app", "shell", "hidden"].includes(feature.placement));
};

const initialEnabledFeatures = featureRegistry.filter(isFeatureEnabled);

export const useFeatureFlagsStore = create<FeatureFlagsStore>((set) => ({
  enabledFeatures: initialEnabledFeatures,
  setEnabledFeatures: (features) => set({ enabledFeatures: features }),
  toggleFeature: (featureId) => 
    set((state) => {
      const features = state.enabledFeatures.map(feature => 
        feature.id === featureId 
          ? { ...feature, enabled: !feature.enabled }
          : feature
      );
      return { enabledFeatures: features };
    }),
}));

export const useEnabledFeatures = () => useFeatureFlagsStore((state) => state.enabledFeatures);
