import { ReactNode } from "react";

export type NavigationConfig = {
  id: string;
  title?: string | ReactNode;
  path?: string;
  icon?: string | ReactNode;
  group?: string;
  disabled?: boolean;
  visible?: boolean;
  children?: NavigationConfig[];
};
