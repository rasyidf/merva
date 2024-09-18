import { FeatureMetadata } from "@/shared/types/FeatureMetadata";
import { Rectangle } from "@phosphor-icons/react";

export function getNavigationItems(enabledFeatures: FeatureMetadata[]) {
  // Step 1: Filter and map enabledFeatures
  const intermediateNavItems = enabledFeatures
    .filter((x) => !x.placement || (x.placement && !["shell", "hidden", "none"].includes(x.placement)))
    .flatMap((feature: FeatureMetadata) => {
      // Handling feature with explicit navigation property
      if (feature.navigation) {
        return feature.navigation.map((navItem) => ({ ...navItem, group: feature.group }));
      }

      // Handling feature without explicit navigation property
      return [
        {
          id: feature.id,
          title: feature.name,
          path: feature.routes?.[0]?.path ?? "#",
          icon: <Rectangle />,
          group: feature.group,
          disabled: !feature.enabled,
          visible: feature.visible,
        },
      ];
    });

  // Step 2: Grouping by group property
  const groupedNavItems: Record<string, any> = intermediateNavItems.reduce((acc: Record<string, any>, item) => {
    const group = item.group || "ungrouped";
    acc[group] = acc[group] || [];
    acc[group].push(item);
    return acc;
  }, {});

  // Step 3: Creating grouped navigation items
  const navItems = Object.keys(groupedNavItems)
    .map((groupKey) => {
      if (groupKey === "ungrouped") {
        return groupedNavItems[groupKey];
      }
      return {
        id: groupKey,
        title: groupKey, // or any other logic for the title
        children: groupedNavItems[groupKey],
        // Add any other default properties for the group
      };
    })
    .flat();

  return { navItems };
}
