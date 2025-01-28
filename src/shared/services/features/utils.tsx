import { useMemo } from "react";
import { useEnabledFeatures } from "./feature.store";
import { processFeatures } from "./feature.utils";

// Function to get navigation items
export function useNavigationItems() {
  const enabledFeatures = useEnabledFeatures();
  const { navItems } = useMemo(() => processFeatures(enabledFeatures), [enabledFeatures]);
  return { navItems };
}
