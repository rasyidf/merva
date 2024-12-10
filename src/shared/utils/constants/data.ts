import type { IconName } from "@/shared/assets/icons/types";

export enum Status {
  Backlog = "backlog",
  Todo = "todo",
  InProgress = "in progress",
  Done = "done",
  Canceled = "canceled",
}

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
];

export const statuses = [
  {
    value: "backlog",
    label: "Backlog",
    icon: "bookMarked",
  },
  {
    value: "todo",
    label: "Todo",
    icon: "square",
  },
  {
    value: "in progress",
    label: "In Progress",
    icon: "clock5",
  },
  {
    value: "done",
    label: "Done",
    icon: "checkCircle",
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: "xCircle",
  },
] satisfies {
  label: string;
  value: string;
  icon: IconName;
}[];

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: "caretDown",
  },
  {
    label: "Medium",
    value: "medium",
    icon: "caretRight",
  },
  {
    label: "High",
    value: "high",
    icon: "caretUp",
  },
] satisfies {
  label: string;
  value: string;
  icon: IconName;
}[];

export const userRoles = [
  {
    value: "Developer",
    label: "Developer",
  },
  {
    value: "Data Analyst",
    label: "Data Analyst",
  },
  {
    value: "Engineer",
    label: "Engineer",
  },
  {
    value: "Technician",
    label: "Technician",
  },
  {
    value: "Researcher",
    label: "Researcher",
  },
] satisfies {
  label: string;
  value: string;
}[];

export const teams = [
  {
    value: "Research Team",
    label: "Research Team",
  },
  {
    value: "Development Team",
    label: "Development Team",
  },
  {
    value: "Maintenance Team",
    label: "Maintenance Team",
  },
  {
    value: "Notification Team",
    label: "Notification Team",
  },
  {
    value: "UI Team",
    label: "UI Team",
  },
  {
    value: "Impact Analysis Team",
    label: "Impact Analysis Team",
  },
  {
    value: "Tracking Team",
    label: "Tracking Team",
  },
  {
    value: "System Team",
    label: "System Team",
  },
  {
    value: "Transmission Team",
    label: "Transmission Team",
  },
] satisfies {
  label: string;
  value: string;
}[];

export const categories = [
  {
    value: "Tracking",
    label: "Tracking",
  },
  {
    value: "Research",
    label: "Research",
  },
  {
    value: "Maintenance",
    label: "Maintenance",
  },
  {
    value: "Optimization",
    label: "Optimization",
  },
  {
    value: "Notification",
    label: "Notification",
  },
  {
    value: "Display",
    label: "Display",
  },
  {
    value: "Analysis",
    label: "Analysis",
  },
  {
    value: "Indexing",
    label: "Indexing",
  },
] satisfies {
  label: string;
  value: string;
}[];
