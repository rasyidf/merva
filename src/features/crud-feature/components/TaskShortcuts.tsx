import { useHotkeys } from "@mantine/hooks";
import { useNavigate, useLocation } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { useTranslation } from "react-i18next";
import { useTaskQuery } from "../hooks/useTaskQuery";

interface TaskShortcutsProps {
  taskId?: string;
  onRefresh?: () => void;
}

export function TaskShortcuts({ taskId, onRefresh }: TaskShortcutsProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { deleteTask } = useTaskQuery();

  const isListPage = !location.pathname.includes("/edit/") && 
                    !location.pathname.includes("/create");

  useHotkeys([
    ['mod+N', () => {
      if (isListPage) {
        navigate('create');
      }
    }],
    ['mod+E', () => {
      if (taskId) {
        navigate(`edit/${taskId}`);
      }
    }],
    ['mod+R', () => {
      if (onRefresh) {
        onRefresh();
        notifications.show({
          message: t("tasks.notifications.refresh"),
          color: "blue",
        });
      }
    }],
    ['mod+Backspace', async () => {
      if (taskId && isListPage) {
        try {
          await deleteTask(taskId);
          notifications.show({
            title: t("tasks.notifications.delete.success"),
            message: t("tasks.notifications.delete.message"),
            color: "green",
          });
          if (onRefresh) onRefresh();
        } catch (error) {
          notifications.show({
            title: t("tasks.notifications.delete.error"),
            message: error instanceof Error ? error.message : t("tasks.notifications.delete.default"),
            color: "red",
          });
        }
      }
    }],
    ['Escape', () => {
      if (!isListPage) {
        navigate('../');
      }
    }],
  ]);

  return null;
}