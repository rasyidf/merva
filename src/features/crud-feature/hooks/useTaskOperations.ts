import { useState } from "react";
import type { Task } from "../data/schema";
import { TaskService } from "../services/taskService";
import { notifications } from "@mantine/notifications";

export function useTaskOperations() {
  const [loading, setLoading] = useState(false);
  const service = new TaskService();

  const createTask = async (task: Omit<Task, "id">): Promise<Task | null> => {
    setLoading(true);
    try {
      const result = await service.createTask(task);
      notifications.show({
        title: "Success",
        message: "Task created successfully",
        color: "green",
      });
      return result;
    } catch (error) {
      notifications.show({
        title: "Error",
        message: error instanceof Error ? error.message : "Failed to create task",
        color: "red",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async (id: string, updates: Partial<Task>): Promise<Task | null> => {
    setLoading(true);
    try {
      const result = await service.updateTask(id, updates);
      notifications.show({
        title: "Success",
        message: "Task updated successfully",
        color: "green",
      });
      return result;
    } catch (error) {
      notifications.show({
        title: "Error",
        message: error instanceof Error ? error.message : "Failed to update task",
        color: "red",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id: string): Promise<boolean> => {
    setLoading(true);
    try {
      await service.deleteTask(id);
      notifications.show({
        title: "Success",
        message: "Task deleted successfully",
        color: "green",
      });
      return true;
    } catch (error) {
      notifications.show({
        title: "Error",
        message: error instanceof Error ? error.message : "Failed to delete task",
        color: "red",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const getTask = async (id: string): Promise<Task | null> => {
    setLoading(true);
    try {
      return await service.getTask(id);
    } catch (error) {
      notifications.show({
        title: "Error",
        message: error instanceof Error ? error.message : "Failed to fetch task",
        color: "red",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    createTask,
    updateTask,
    deleteTask,
    getTask,
  };
}