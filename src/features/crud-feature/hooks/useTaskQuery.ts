import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import type { Task } from "../data/schema";
import { TaskService } from "../services/taskService";
import { notifications } from "@mantine/notifications";
import { useTranslation } from "react-i18next";
import { featureId } from "..";

const taskService = new TaskService();

export function useTaskQuery(taskId?: string) {
    const { t } = useTranslation(featureId);
    const queryClient = useQueryClient();

    const taskQuery = useQuery({
        queryKey: ["task", taskId],
        queryFn: () => taskId ? taskService.getTask(taskId) : null,
        enabled: !!taskId,
    });

    const createMutation = useMutation({
        mutationFn: (newTask: Omit<Task, "id">) => taskService.createTask(newTask),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
            notifications.show({
                title: t("tasks.notifications.create.success"),
                message: t("tasks.notifications.create.message"),
                color: "green",
            });
        },
        onError: (error: Error) => {
            notifications.show({
                title: t("tasks.notifications.create.error"),
                message: error.message,
                color: "red",
            });
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, updates }: { id: string; updates: Partial<Task> }) =>
            taskService.updateTask(id, updates),
        onSuccess: (updatedTask) => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
            queryClient.setQueryData(["task", updatedTask.id], updatedTask);
            notifications.show({
                title: t("tasks.notifications.update.success"),
                message: t("tasks.notifications.update.message"),
                color: "green",
            });
        },
        onError: (error: Error) => {
            notifications.show({
                title: t("tasks.notifications.update.error"),
                message: error.message,
                color: "red",
            });
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string) => taskService.deleteTask(id),
        onSuccess: (_, id) => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
            queryClient.removeQueries({ queryKey: ["task", id] });
            notifications.show({
                title: t("tasks.notifications.delete.success"),
                message: t("tasks.notifications.delete.message"),
                color: "green",
            });
        },
        onError: (error: Error) => {
            notifications.show({
                title: t("tasks.notifications.delete.error"),
                message: error.message,
                color: "red",
            });
        },
    });

    return {
        task: taskQuery.data,
        isLoading: taskQuery.isLoading,
        isError: taskQuery.isError,
        error: taskQuery.error,
        createTask: createMutation.mutateAsync,
        updateTask: updateMutation.mutateAsync,
        deleteTask: deleteMutation.mutateAsync,
        isMutating: createMutation.isPending || updateMutation.isPending || deleteMutation.isPending,
    };
}