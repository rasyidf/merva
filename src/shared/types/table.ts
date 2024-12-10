import type { ColumnFilter } from "@tanstack/react-table";
import type { ReactNode, SetStateAction } from "react";

import type { DeepKeys } from "./utils";

export type FilterType<T = any> = {
  onChange: SetStateAction<T>;
  onChangeGlobal?: SetStateAction<T>;
  otherChange?: SetStateAction<T>;
  clearFilter?: () => void;
  globalValue?: ColumnFilter[];
  value: T;
  searchable?: boolean;
  withWrapper?: boolean;
};

export type FilterComponentDefinition = {
  id: string;
  render: (props: { paramName: string } & FilterType) => ReactNode;
};

export class FilterHelper<TData> {
  create<TAccessor extends DeepKeys<TData>>(accessor: TAccessor, options: FilterComponentDefinition) {
    return {
      ...options,
      id: accessor as string,
    } satisfies FilterComponentDefinition;
  }
}
export function createFilterHelper<TData>() {
  return new FilterHelper<TData>();
}
