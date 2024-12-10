import type { Table } from "@tanstack/react-table";
import type React from "react";
import { createContext, useContext } from "react";

interface DataTableContextProps<TData> {
  table: Table<TData>;
}

const DataTableContext = createContext<DataTableContextProps<any> | undefined>(undefined);

export function useDataTableContext<TData>() {
  const context = useContext(DataTableContext);
  if (!context) {
    throw new Error("Table Component must be used within a DataTable");
  }
  return context as DataTableContextProps<TData>;
}

interface DataTableProviderProps<TData> {
  table: Table<TData>;
  children: React.ReactNode;
}

export function DataTableProvider<TData>({ table, children }: Readonly<DataTableProviderProps<TData>>) {
  return <DataTableContext.Provider value={{ table }}>{children}</DataTableContext.Provider>;
}
