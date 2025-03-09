import type { ColumnFilter, ColumnFiltersState, PaginationState, SortingState } from "@tanstack/react-table";
import type { Task } from "../data/schema";
import { MockTaskRepository, type TaskRepository } from "../data/repository/taskRepository";

export class TaskService {
  private repository: TaskRepository;

  constructor(repository?: TaskRepository) {
    this.repository = repository ?? new MockTaskRepository();
  }

  async getTasks(
    sorting: SortingState,
    columnFilters: ColumnFiltersState,
    pagination: PaginationState,
    globalFilter: string,
  ): Promise<{
    data: Task[];
    meta: { pageIndex: number; pageSize: number; pageCount: number };
  }> {
    const tasks = await this.repository.findAll();
    let filtered = [...tasks];

    // Apply global filter
    if (globalFilter) {
      filtered = filtered.filter((task) => {
        return task.title.toLowerCase().includes(globalFilter.toLowerCase()) ||
               task.id.toLowerCase().includes(globalFilter.toLowerCase());
      });
    }

    // Apply column filters
    if (columnFilters.length > 0) {
      const filterColumn = (task: Task) => (filter: ColumnFilter) => {
        const column = filter.id;
        const value = filter.value;

        if (typeof value === 'string') {
          return task[column as keyof Task]?.toString().toLowerCase().includes(value.toLowerCase());
        }
        if (Array.isArray(value)) {
          return value.includes(task[column as keyof Task]);
        }
        if (typeof value === 'number') {
          return task[column as keyof Task] === value;
        }
        return false;
      };

      filtered = filtered.filter((task) => columnFilters.every(filterColumn(task)));
    }

    // Apply sorting
    if (sorting.length > 0) {
      filtered = [...filtered].sort((a, b) => {
        for (const sort of sorting) {
          const column = sort.id as keyof Task;
          const direction = sort.desc ? -1 : 1;
          
          if (a[column] < b[column]) return -1 * direction;
          if (a[column] > b[column]) return 1 * direction;
        }
        return 0;
      });
    }

    // Apply pagination
    const start = pagination.pageIndex * pagination.pageSize;
    const end = start + pagination.pageSize;
    const paginatedData = filtered.slice(start, end);

    return {
      data: paginatedData,
      meta: {
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
        pageCount: Math.ceil(filtered.length / pagination.pageSize),
      },
    };
  }

  async getTask(id: string): Promise<Task | null> {
    return this.repository.findById(id);
  }

  async createTask(task: Omit<Task, "id">): Promise<Task> {
    return this.repository.create(task);
  }

  async updateTask(id: string, updates: Partial<Task>): Promise<Task> {
    return this.repository.update(id, updates);
  }

  async deleteTask(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}