import type { ReactNode } from "react";
import { IconName } from "../assets/icons/types";

export type NavigationPlacement = 'top' | 'bottom' | 'header';

export type NavigationConfig = {
  id: string;
  title?: string | ReactNode;
  path?: string;
  icon?: IconName | ReactNode;
  group?: string;
  groupLabel?: string; // Label for the group in sidebar
  groupIcon?: IconName | ReactNode; // Icon for the group
  groupOrder?: number; // Order for the group
  disabled?: boolean;
  visible?: boolean;
  placement?: NavigationPlacement; // Where this navigation item should be rendered
  children?: NavigationConfig[];
};
