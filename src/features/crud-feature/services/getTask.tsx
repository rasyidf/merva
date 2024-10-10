// src/pages/getTasks.ts

import type { SortingState, ColumnFiltersState } from "@tanstack/react-table";
import type { Task } from "../data/schema";

export async function getTasks(
  sorting: SortingState,
  filters: ColumnFiltersState,
  pagination: {
    pageIndex: number;
    pageSize: number;
  },
  globalFilter: string,
): Promise<{
  data: Task[];
  meta: {
    pageIndex: number;
    pageSize: number;
    pageCount: number;
  };
}> {
  const params = new URLSearchParams();

  // Pagination
  params.append("page", (pagination.pageIndex + 1).toString());
  params.append("pageSize", pagination.pageSize.toString());

  // Sorting
  sorting.forEach((sort) => {
    params.append("sort", `${sort.id}:${sort.desc ? "desc" : "asc"}`);
  });

  // Filtering
  filters.forEach((filter) => {
    params.append(`filter[${filter.id}]`, filter.value as string);
  });

  // Global Filter
  if (globalFilter) {
    params.append("search", globalFilter);
  }

  const mock = true;
  if (mock) {
    return import("./mockGetTask").then((mod) => mod.getTasks(sorting, filters, pagination, globalFilter));
  }

  const response = await fetch(`/api/tasks?${params.toString()}`);
  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.statusText}`);
  }
  const result = await response.json();

  return {
    data: result.data,
    meta: result.meta,
  };
}
