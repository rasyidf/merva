import type { Task } from "../schema";
import data from "../tasks.json";
import { taskSchema } from "../schema";
import { z } from "zod";

export interface TaskRepository {
  findAll(): Promise<Task[]>;
  findById(id: string): Promise<Task | null>;
  create(task: Omit<Task, "id">): Promise<Task>;
  update(id: string, task: Partial<Task>): Promise<Task>;
  delete(id: string): Promise<void>;
}

export class MockTaskRepository implements TaskRepository {
  private tasks: Task[] = data as Task[];

  async findAll(): Promise<Task[]> {
    return z.array(taskSchema).parse(this.tasks);
  }

  async findById(id: string): Promise<Task | null> {
    const task = this.tasks.find(t => t.id === id);
    return task ? taskSchema.parse(task) : null;
  }

  async create(task: Omit<Task, "id">): Promise<Task> {
    const newTask = {
      ...task,
      id: `TASK-${Math.floor(Math.random() * 10000)}`,
      createdDate: new Date().toISOString().split('T')[0],
      updatedDate: new Date().toISOString().split('T')[0],
    };
    
    const validatedTask = taskSchema.parse(newTask);
    this.tasks.push(validatedTask);
    return validatedTask;
  }

  async update(id: string, updates: Partial<Task>): Promise<Task> {
    const index = this.tasks.findIndex(t => t.id === id);
    if (index === -1) throw new Error(`Task with id ${id} not found`);

    const updatedTask = {
      ...this.tasks[index],
      ...updates,
      updatedDate: new Date().toISOString().split('T')[0],
    };

    const validatedTask = taskSchema.parse(updatedTask);
    this.tasks[index] = validatedTask;
    return validatedTask;
  }

  async delete(id: string): Promise<void> {
    const index = this.tasks.findIndex(t => t.id === id);
    if (index === -1) throw new Error(`Task with id ${id} not found`);
    
    this.tasks.splice(index, 1);
  }
}