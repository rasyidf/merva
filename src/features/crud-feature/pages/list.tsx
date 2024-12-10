import { DataTable, useDataTable } from "@/shared/components/groups/data-table";
import { PageHeader } from "@/shared/components/groups/main-header";
import { filterableColumns, useTaskColumns } from "../components/columns";

import { Notify } from "@/shared/services";
import { modalService } from "@/shared/services/modals/service";
import { Alert, Box, Button, Drawer, Group, LoadingOverlay, Paper } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import type { Task } from "../data/schema";
import { getTasks } from "../services/getTask";
import EntityCreate from "./create";
import EntityDetails from "./details";
import EntityEdit from "./edit";

export const EntityList = () => {
  const [modalState, setModalState] = useState<{
    action: "create" | "update" | "detail";
    id: string;
  } | null>(null);
  const [opened, { open, close }] = useDisclosure(false);

  const columns = useTaskColumns({
    onEdit: ({ id }) => {
      setModalState({ action: "update", id });
      return open();
    },
    onDelete: ({ id }) =>
      modalService.deleteModal({
        message: "Are you sure you want to delete this task?",
        onConfirm: () => {
          Notify.success("Success", `Task ${id} deleted successfully`);
        },
      }),
  });

  // usePrompt("You have unsaved changes. Are you sure you want to leave?", true);

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
      <PageHeader title="Task" subtitle="This is CRUD Feature contains Create, Read, Update, Delete Operation">
        <Group>
          <Button
            onClick={() => {
              setModalState({ action: "create", id: "" });
              open();
            }}
          >
            Create Task
          </Button>
        </Group>
      </PageHeader>
      <Box mt={16}>
        {error && (
          <Alert color="red" p={16} style={{ border: "1px solid red" }}>
            {error.message}
          </Alert>
        )}
        <LoadingOverlay visible={isLoading} />
        <DataTable.Container table={table}>
          <DataTable.Toolbar meta={{ filterableColumns }} />
          <DataTable.Core />
          <DataTable.Pagination />
        </DataTable.Container>
      </Box>

      <Drawer
        opened={opened}
        position="right"
        onClose={close}
        withinPortal
        title={
          modalState?.action === "create"
            ? "Create Task"
            : modalState?.action === "update"
              ? "Update Task"
              : modalState?.action === "detail"
                ? "Task Details"
                : ""
        }
      >
        {modalState?.action === "create" && <EntityCreate onCancel={() => close()} />}
        {modalState?.action === "update" && <EntityEdit />}
        {modalState?.action === "detail" && <EntityDetails />}
      </Drawer>
    </Paper>
  );
};

export default EntityList;
