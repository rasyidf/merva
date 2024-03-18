import { PageHeader } from "@/components/groups/Header";
import { columns } from "../components/columns";
import { DataTable } from "../components/data-table";


import { Box, Paper } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import {
  ColumnFiltersState,
  ColumnSizingState,
  RowSelectionState,
  SortingState,
  TableState,
} from "@tanstack/react-table";
import { useState } from "react";
import { Task } from "../data/schema";
import { getTasks } from "./getTasks";

type Props = {};

export const EntityList = (props: Props) => {
  const [state, setState] = useState<TableState>({
    pagination: {
      pageIndex: 0,
      pageSize: 10,
    },
    rowSelection: {} as RowSelectionState,
    sorting: [] as SortingState,
    columnFilters: [] as ColumnFiltersState,
    globalFilter: "",
    columnPinning: {},
    columnVisibility: {},
    columnSizing: {} as ColumnSizingState,
  } as TableState);

  const { data } = useQuery({
    queryKey: ["tasks", state.sorting, state.columnFilters, state.pagination, state.globalFilter] as const,
    queryFn: async ({ queryKey: [_, sorting, columnFilters, pagination, q] }) => {
      return getTasks(sorting, columnFilters, pagination, q) as Promise<{
        data: Task[];
        meta: { pageIndex: number; pageSize: number; pageCount: number; };
      }>;
    },
  });

  return (
    <Paper p={16}>
      <PageHeader title="Task" subtitle="This is CRUD Feature contains Create, Read, Update, Delete Operation" />
      <Box mt={16}>
        <DataTable data={data} columns={columns} state={state} setState={setState} />
      </Box>
    </Paper>
  );
};

export default EntityList;
