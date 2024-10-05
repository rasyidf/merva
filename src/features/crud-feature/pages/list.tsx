import DataTable, { useDataTable } from "@/components/groups/data-table";
import { PageHeader } from "@/components/groups/main-header";
import { columns, filterableColumns } from "../components/columns";

import { Alert, Box, LoadingOverlay, Paper } from "@mantine/core";
import { Task } from "../data/schema";
import { getTasks } from "../services/getTask";


export const EntityList = () => {
  const { table, isLoading, error } = useDataTable<Task, any>({
    key: ["task"],
    columns,
    dataFetcher: ({ sorting, filters, pagination, globalFilter }) => {
      return getTasks(sorting, filters, pagination, globalFilter);
    },
    enableSearchParamsSync: true,
  });

  return (
    <Paper p={16}>
      <PageHeader title="Task" subtitle="This is CRUD Feature contains Create, Read, Update, Delete Operation" />
      <Box mt={16}>
        {
          error && (
            <Alert color="red" p={16} style={{ border: "1px solid red" }}>
              {error.message}
            </Alert>
          )
        }
        <LoadingOverlay visible={isLoading} />
        <DataTable.Container table={table} >
          <DataTable.Toolbar meta={{ filterableColumns }} />
          <DataTable.Core />
          <DataTable.Pagination />
        </DataTable.Container>
      </Box>
    </Paper>
  );
};

export default EntityList;
