import { PageHeader } from "@/components/groups/Header";
import { DataTable } from "../components/data-table";
import { columns } from "../components/columns";

import data from "../data/tasks.json";

import z from "zod";
import { Task, taskSchema } from "../data/schema";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Box, Container } from "@mantine/core";

type Props = {};

async function getTasks() {
	const tasks = data;

	return z.array(taskSchema).parse(tasks);
}


export const EntityList = (props: Props) => {

	const { data } = useQuery({
		queryKey: ["tasks"],
		queryFn: getTasks,
	});

	return <>
		<PageHeader title="CRUD" subtitle="This is CRUD Feature contains Create, Read, Update, Delete Operation" />

		<Box>
			<DataTable data={data} columns={columns} />
		</Box>

	</>;
};



export default EntityList;
