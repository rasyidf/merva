import { z } from "zod";

export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.enum(["backlog", "in progress", "todo", "done", "canceled"]),
  label: z.string(),
  priority: z.number().min(1).max(3),
  storyPoints: z.number(),
  createdDate: z.string(),
  updatedDate: z.string(),
  dueDate: z.string(),
  estimatedCompletionTime: z.number(),
  assignedUser: z.string(),
  assignedUserRole: z.string(),
  assignedTeam: z.string(),
  category: z.string(),
  tags: z.array(z.string()),
  progressPercentage: z.number().min(0).max(100),
});

export type Task = z.infer<typeof taskSchema>;
