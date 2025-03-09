import { createContext, useContext, type ReactNode } from "react";
import { useTaskQuery } from "../hooks/useTaskQuery";
import { useTranslation } from "react-i18next";

interface TaskContextType {
  taskId?: string;
  setTaskId: (id: string) => void;
}

const TaskContext = createContext<TaskContextType | null>(null);

interface TaskProviderProps {
  children: ReactNode;
  initialTaskId?: string;
}

export function TaskProvider({ children, initialTaskId }: TaskProviderProps) {
  const { t } = useTranslation();
  const taskQuery = useTaskQuery(initialTaskId);

  const contextValue = {
    taskId: initialTaskId,
    setTaskId: (id: string) => {
      // Handle task ID changes
    },
    ...taskQuery,
    t,
  };

  return (
    <TaskContext.Provider value={contextValue}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTask() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTask must be used within a TaskProvider");
  }
  return context;
}