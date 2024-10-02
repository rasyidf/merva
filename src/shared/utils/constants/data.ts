import { IconName } from "@/assets/icons/types";



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
