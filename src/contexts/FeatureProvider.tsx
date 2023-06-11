import React from "react";
import { createContext, useContext, ReactNode } from "react";
import featuresRegistry from "../configs/feature-registry";
import { FeatureMetadata } from "../types/FeatureMetadata";

interface FeatureFlagsContextValue {
	enabledFeatures: FeatureMetadata[];
}
const FeatureFlagsContext = createContext<FeatureFlagsContextValue | undefined>(
	undefined,
);

interface FeatureFlagsContextProviderProps {
	children: ReactNode;
}

export const FeatureFlagsProvider: React.FC<FeatureFlagsContextProviderProps> =
	({ children }) => {
		const enabledFeatures = featuresRegistry.filter(
			(feature) => feature.enabled,
		) as FeatureMetadata[];

		return (
			<FeatureFlagsContext.Provider value={{ enabledFeatures }}>
				{children}
			</FeatureFlagsContext.Provider>
		);
	};

export const useFeatureFlags = (): FeatureFlagsContextValue => {
	const context = useContext(FeatureFlagsContext);
	if (!context) {
		throw new Error(
			"useFeatureFlags must be used within a FeatureFlagsContextProvider",
		);
	}
	return context;
};
