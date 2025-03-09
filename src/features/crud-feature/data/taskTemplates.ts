import type { Task } from "./schema";
import { z } from "zod";

export const taskTemplateSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  template: z.object({
    title: z.string().optional(),
    status: z.string().optional(),
    label: z.string().optional(),
    priority: z.number().optional(),
    storyPoints: z.number().optional(),
    estimatedCompletionTime: z.number().optional(),
    assignedTeam: z.string().optional(),
    assignedUserRole: z.string().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

export type TaskTemplate = z.infer<typeof taskTemplateSchema>;

// Common task templates
export const taskTemplates: TaskTemplate[] = [
  {
    id: "bug-report",
    name: "Bug Report",
    description: "Template for creating bug reports",
    template: {
      title: "[BUG] ",
      status: "todo" as const,
      label: "bug",
      priority: 3,
      storyPoints: 3,
      estimatedCompletionTime: 4,
      category: "bug",
      tags: ["bug", "fix"],
    },
  },
  {
    id: "feature-request",
    name: "Feature Request",
    description: "Template for new feature requests",
    template: {
      title: "[FEATURE] ",
      status: "backlog" as const,
      label: "enhancement",
      priority: 2,
      storyPoints: 5,
      estimatedCompletionTime: 8,
      category: "feature",
      tags: ["feature", "enhancement"],
    },
  },
  {
    id: "maintenance",
    name: "Maintenance Task",
    description: "Template for maintenance tasks",
    template: {
      title: "[MAINTENANCE] ",
      status: "todo" as const,
      label: "maintenance",
      priority: 1,
      storyPoints: 2,
      estimatedCompletionTime: 2,
      category: "maintenance",
      tags: ["maintenance", "improvement"],
    },
  },
];

export function applyTemplate(template: TaskTemplate, baseTask?: Partial<Task>): Partial<Task> {
  return {
    ...baseTask,
    ...template.template,
    title: template.template.title 
      ? (baseTask?.title ? template.template.title + baseTask.title : template.template.title)
      : baseTask?.title,
    tags: [
      ...(template.template.tags || []),
      ...(baseTask?.tags || []),
    ],
  } as Partial<Task>;
}