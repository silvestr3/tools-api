import { Tool } from '@prisma/client';
import { CreateTool, ToolsRepository } from '../tools-repository';
import { randomUUID } from 'node:crypto';

export class FakeToolsRepository implements ToolsRepository {
  public tools: Tool[] = [];

  async getAll(): Promise<Tool[]> {
    return this.tools;
  }

  async filterByTag(tag: string): Promise<Tool[]> {
    const tools = this.tools.filter((tool) => tool.tags.includes(tag));

    return tools;
  }

  async create(props: CreateTool): Promise<void> {
    const { id, description, link, tags, title } = props;

    const tool = {
      id: id ?? randomUUID(),
      title,
      description,
      link,
      tags,
    };

    this.tools.push(tool);
  }

  async delete(id: string): Promise<void> {
    const index = this.tools.findIndex((tool) => tool.id === id);
    this.tools.splice(index, 1);
  }
}
