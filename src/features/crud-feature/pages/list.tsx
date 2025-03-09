import { DataTable, useDataTable } from "@/shared/components/groups/data-table";
import { PageHeader } from "@/shared/components/groups/main-header";
import { SvgIcon } from "@/shared/components/ui/icon";
import { modalService } from "@/shared/services/modals/service";
import { ActionIcon, Alert, Box, Button, Group, LoadingOverlay, Menu, Paper, Stack } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { filterableColumns, useTaskColumns } from "../components/columns";
import { TaskShortcuts } from "../components/TaskShortcuts";
import { TaskService } from "../services/taskService";
import { TaskExport } from "../utils/taskExport";
import { featureId } from "..";

export const EntityList = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(featureId);
  const taskService = new TaskService();
  const columns = useTaskColumns({
    onEdit: ({ id }) => navigate(`edit/${id}`),
    onDelete: async ({ id }) =>
      modalService.deleteModal({
        message: t("tasks.list.deleteConfirm"),
        onConfirm: async () => {
          try {
            await taskService.deleteTask(id);
            notifications.show({
              title: t("tasks.notifications.delete.success"),
              message: t("tasks.notifications.delete.message"),
              color: "green",
            });
            await table.reset();
          } catch (error) {
            notifications.show({
              title: t("tasks.notifications.delete.error"),
              message: error instanceof Error ? error.message : "Unknown error",
              color: "red",
            });
          }
        },
      }),
  });

  const { table, isLoading, error, data } = useDataTable({
    key: ["tasks"],
    columns,
    dataFetcher: ({ sorting, filters, pagination, globalFilter }) => {
      return taskService.getTasks(sorting, filters, pagination, globalFilter);
    },
    enableSearchParamsSync: true,
  });

  const handleExport = (format: "csv" | "json") => {

    TaskExport.export([], { format });
  };


  return (
    <Stack gap="md">
      <TaskShortcuts
        taskId={'selectedTaskId'}
        onRefresh={table.reset}
      />

      <Paper p="md">
        <PageHeader
          title={t("tasks.list.title")}
          subtitle={t("tasks.list.subtitle")}
        >
          <Group>
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <ActionIcon variant="light" size="lg">
                  <SvgIcon name="fileDown" width={20} height={20} />
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>Export Tasks</Menu.Label>
                <Menu.Item onClick={() => handleExport("csv")}>
                  <Group>
                    <SvgIcon name="fileSpreadsheet" width={16} height={16} />
                    <span>Export as CSV</span>
                  </Group>
                </Menu.Item>
                <Menu.Item onClick={() => handleExport("json")}>
                  <Group>
                    <SvgIcon name="filePieChart" width={16} height={16} />
                    <span>Export as JSON</span>
                  </Group>
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>

            <Button onClick={() => navigate("create")}>
              {t("tasks.list.createButton")}
            </Button>
          </Group>
        </PageHeader>
      </Paper>


      <Paper p="md">
        {error && (
          <Alert color="red" mb={16}>
            {error.message}
          </Alert>
        )}

        <Box pos="relative">
          <LoadingOverlay visible={isLoading} />
          <DataTable.Container table={table}>
            <DataTable.Toolbar meta={{ filterableColumns }} />
            <DataTable.Core />
            <DataTable.Pagination />
          </DataTable.Container>
        </Box>
      </Paper>
    </Stack>
  );
};

export default EntityList;
