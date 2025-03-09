import { PageHeader } from "@/shared/components/groups/main-header";
import { Alert, LoadingOverlay, Paper } from "@mantine/core";
import { TaskForm } from "../components/TaskForm";
import { useParams } from "react-router-dom";
import { TaskService } from "../services/taskService";
import { useEffect, useState } from "react";
import type { Task } from "../data/schema";

export const EntityEdit = () => {
  const { id } = useParams<{ id: string }>();
  const [task, setTask] = useState<Task | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTask = async () => {
      if (!id) return;
      try {
        const taskService = new TaskService();
        const taskData = await taskService.getTask(id);
        if (!taskData) {
          setError("Task not found");
          return;
        }
        setTask(taskData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load task");
      } finally {
        setLoading(false);
      }
    };

    loadTask();
  }, [id]);

  if (error) {
    return (
      <Paper p="md">
        <Alert color="red" title="Error">
          {error}
        </Alert>
      </Paper>
    );
  }

  return (
    <Paper p="md" pos="relative">
      <LoadingOverlay visible={loading} />
      <PageHeader 
        title="Edit Task" 
        subtitle={`Editing task ${id}`}
      />
      {!loading && task && <TaskForm mode="edit" initialValues={task} />}
    </Paper>
  );
};

export default EntityEdit;
