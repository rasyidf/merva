import { IconName } from "@/assets/icons/types";
import { SvgIcon } from "@/components/ui/icon";
import { FeatureMetadata } from "@/shared/types";
import { NavigationConfig } from "@/shared/types";
import { useEnabledFeatures } from "./feature-store";


// Function to get navigation items
export function useNavigationItems() {
  // Retrieve active features using the FeatureService
  const enabledFeatures: FeatureMetadata[] = useEnabledFeatures();

  // Filter and map enabledFeatures to navigation items
  const intermediateNavItems: NavigationConfig[] = enabledFeatures
    .filter(
      (feature) =>
        !feature.placement ||
        (feature.placement && !["shell", "hidden", "none"].includes(feature.placement))
    )
    .flatMap((feature) => {
      // Handling feature with explicit navigation property
      if (feature.navigation && feature.navigation.length > 0) {
        return feature.navigation.map((navItem) => ({
          ...navItem,
          group: feature.group,
          disabled: !feature.enabled,
          visible: feature.visible !== false, // Default to true if undefined
        }));
      }

      // Handling feature without explicit navigation property
      return [
        {
          id: feature.id,
          title: feature.name,
          path: feature.routes?.[0]?.path ?? "#",
          icon: feature.icon ? (
            typeof feature.icon === "string" ? (
              <SvgIcon name={feature.icon as IconName} />
            ) : (
              feature.icon
            )
          ) : (
            <SvgIcon name="square" />
          ),
          group: feature.group,
          disabled: !feature.enabled,
          visible: feature.visible !== false,
        } as NavigationConfig,
      ];
    });

  // Group navigation items by 'group' property
  const groupedNavItems = intermediateNavItems.reduce<Record<string, NavigationConfig[]>>(
    (acc, item) => {
      const group = item.group ?? "ungrouped";
      if (!acc[group]) {
        acc[group] = [];
      }
      acc[group].push(item);
      return acc;
    },
    {}
  );

  // Create final navigation items with grouping
  const navItems = Object.entries(groupedNavItems).flatMap(([groupKey, items]) => {
    if (groupKey === "ungrouped") {
      return items;
    }
    return {
      id: groupKey,
      title: groupKey,
      children: items,
      // Additional properties can be added here
    } as NavigationConfig;
  });

  return { navItems };
}
