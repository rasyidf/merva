import { FeatureMetadata } from "@/types/FeatureMetadata";
import { NavigationConfig } from "@/types/NavigationConfig";
import { Rectangle } from "@phosphor-icons/react";



export function getNavigationItems(enabledFeatures: FeatureMetadata[]) {
	const navItems = enabledFeatures
		.filter((x) => !x.placement || (x.placement && !["shell", "hidden", "none"].includes(x.placement)))
		.flatMap((feature: any) => {
			if (feature.navigation) {
				return feature.navigation;
			} else {
				return [
					{
						id: feature.id,
						title: feature.name,
						path: feature.routes?.[0]?.path ?? "#",
						icon: <Rectangle />,
					},
				];
			}
		}) as NavigationConfig[];

	return { navItems };
}
