import type { Task } from "../data/schema";
import { format } from "date-fns";

interface ExportOptions {
  format: "csv" | "json" | "excel";
  filename?: string;
}

export class TaskExport {
  private static formatTask(task: Task) {
    return {
      id: task.id,
      title: task.title,
      status: task.status,
      label: task.label,
      priority: task.priority === 3 ? "High" : task.priority === 2 ? "Medium" : "Low",
      storyPoints: task.storyPoints,
      dueDate: task.dueDate,
      estimatedCompletionTime: task.estimatedCompletionTime,
      progressPercentage: task.progressPercentage,
      assignedUser: task.assignedUser,
      assignedUserRole: task.assignedUserRole,
      assignedTeam: task.assignedTeam,
      category: task.category,
      tags: task.tags.join(", "),
      createdDate: task.createdDate,
      updatedDate: task.updatedDate,
    };
  }

  private static generateCsv(tasks: Task[]): string {
    const formattedTasks = tasks.map(this.formatTask);
    const headers = Object.keys(formattedTasks?.[0] ?? []);
    const rows = formattedTasks.map(task =>
      headers.map(header => {
        const value = task[header as keyof typeof task];
        return typeof value === "string" && value.includes(",")
          ? `"${value}"`
          : value;
      }).join(",")
    );

    return [headers.join(","), ...rows].join("\n");
  }

  static export(tasks: Task[], options: ExportOptions): void {
    const timestamp = format(new Date(), "yyyy-MM-dd_HH-mm");
    const filename = options.filename || `tasks_export_${timestamp}`;
    let content: string;
    let mimeType: string;
    let fileExtension: string;

    switch (options.format) {
      case "csv":
        content = this.generateCsv(tasks);
        mimeType = "text/csv";
        fileExtension = "csv";
        break;
      case "json":
        content = JSON.stringify(tasks.map(this.formatTask), null, 2);
        mimeType = "application/json";
        fileExtension = "json";
        break;
      default:
        throw new Error(`Unsupported export format: ${options.format}`);
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${filename}.${fileExtension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}