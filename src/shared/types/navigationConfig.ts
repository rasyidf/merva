import type { ReactNode } from "react";
import { IconName } from "../assets/icons/types";

export type NavigationConfig = {
  id: string;
  title?: string | ReactNode;
  path?: string;
  icon?: IconName | ReactNode;
  group?: string;
  disabled?: boolean;
  visible?: boolean;
  children?: NavigationConfig[];
};
