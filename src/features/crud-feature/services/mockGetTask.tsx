import data from "../data/tasks.json";
import {
  ColumnFilter,
  ColumnFiltersState, PaginationState, SortingState
} from "@tanstack/react-table";
import z from "zod";
import { Task, taskSchema } from "../data/schema";

export async function getTasks(
  sorting: SortingState,
  columnFilters: ColumnFiltersState,
  pagination: PaginationState,
  q: string
): Promise<{ data: Task[]; meta: { pageIndex: number; pageSize: number; pageCount: number; }; }> {
  const tasks: Record<string, any>[] = data;

  let filtered = tasks;

  if (q) {
    filtered = filtered.filter((task) => {
      return task.title.toLowerCase().includes(q.toLowerCase());
    });
  }
  if (columnFilters && columnFilters.length > 0) {
    const filterColumn = (task: Record<string, any>) => (filter: ColumnFilter) => {
      const column = filter.id;
      const value = filter.value;
      if (value instanceof String) {
        return task[column].toLowerCase().includes(value.toLowerCase());
      }
      if (value instanceof Array) {
        return value.includes(task[column]);
      }
      return false;
    };

    filtered = filtered.filter((task) => {
      return columnFilters.every(filterColumn(task));
    });
  }

  if (sorting && sorting.length > 0) {
    filtered = filtered.sort((a, b) => {
      const column = sorting[0]?.id ?? "";
      const direction = sorting[0]?.desc ? -1 : 1;
      return a[column] > b[column] ? direction : -direction;
    });
  }

  const start = pagination.pageIndex * pagination.pageSize;
  const end = start + pagination.pageSize;

  return {
    data: z.array(taskSchema).parse(filtered.slice(start, end)),
    meta: {
      pageIndex: pagination.pageIndex,
      pageSize: pagination.pageSize,
      pageCount: Math.ceil(filtered.length / pagination.pageSize),
    },
  };
}
