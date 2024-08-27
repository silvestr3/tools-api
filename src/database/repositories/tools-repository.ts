import { Tool } from '@prisma/client';

export interface CreateTool {
  id?: string;
  title: string;
  link: string;
  description: string;
  tags: string[];
}

export abstract class ToolsRepository {
  abstract getAll(): Promise<Tool[]>;
  abstract findById(id: string): Promise<Tool | null>;
  abstract filterByTag(tag: string): Promise<Tool[]>;
  abstract create(props: CreateTool): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
