import { PageHeader } from "@/components/groups/Header";
import { columns } from "../components/columns";
import { DataTable } from "../components/data-table";

import data from "../data/tasks.json";

import { Box } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { ColumnFilter, ColumnFiltersState, PaginationState, RowSelectionState, SortingState, TableState } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import z from "zod";
import { Task, taskSchema } from "../data/schema";

type Props = {};

async function getTasks(
	sorting: SortingState,
	columnFilters: ColumnFiltersState,
	pagination: PaginationState,
	q: string
): Promise<{ data: Record<string, any>[]; meta: { pageIndex: number; pageSize: number; pageCount: number; }; }> {
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
		}
	};
}


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
	} as TableState);

	const { data } = useQuery({
		queryKey: ["tasks", state.sorting, state.columnFilters, state.pagination, state.globalFilter] as const,
		queryFn: async ({
			queryKey: [_, sorting, columnFilters, pagination, q],
		}) => {
			return getTasks(sorting, columnFilters, pagination, q) as Promise<{ data: Task[]; meta: { pageIndex: number; pageSize: number; pageCount: number; }; }>;
		}
	});


	return <>
		<PageHeader title="Task" subtitle="This is CRUD Feature contains Create, Read, Update, Delete Operation" />
		<Box mt={16}>
			<DataTable data={data} columns={columns} state={state} setState={setState} />
		</Box>

	</>;
};



export default EntityList;
