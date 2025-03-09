import { useMemo } from "react";
import { useEnabledFeatures } from "./feature.store";
import { processFeatures } from "./feature.utils";

// Function to get navigation items
export function useNavigationItems() {
  const enabledFeatures = useEnabledFeatures();
  const navigationItems = useMemo(() => {
    const { navItems } = processFeatures(enabledFeatures);
    return navItems;
  }, [enabledFeatures]);
  
  return { navItems: navigationItems };
}
