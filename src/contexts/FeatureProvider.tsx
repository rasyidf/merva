import { create } from 'zustand';
import { featureRegistry } from '@/configs';
import { FeatureMetadata } from '@/types/FeatureMetadata';

type FeatureFlagsStore = {
	enabledFeatures: FeatureMetadata[];
};
// Create a Zustand store
const useFeatureFlagsStore = create<FeatureFlagsStore>((set) => ({
	enabledFeatures: featureRegistry.filter(
		(feature: FeatureMetadata) =>
			feature.enabled || feature?.enabled === undefined || feature?.enabled
	) as FeatureMetadata[],
}));

export const useFeatureFlags = () => {
	const { enabledFeatures } = useFeatureFlagsStore.getState();

	return { enabledFeatures };
};
