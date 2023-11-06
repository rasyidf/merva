import { ReactNode } from "react";

export type NavigationConfig = {
  id: string;
  title?: string | ReactNode;
  path?: string;
  icon?: string | ReactNode;
  disabled?: boolean;
  visible?: boolean;
  children?: NavigationConfig[];
};
