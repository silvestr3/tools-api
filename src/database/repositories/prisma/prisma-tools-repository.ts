import { Injectable } from '@nestjs/common';
import { Tool } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import {
  CreateTool,
  ToolsRepository,
} from 'src/database/repositories/tools-repository';

@Injectable()
export class PrismaToolsRepository implements ToolsRepository {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<Tool[]> {
    const tools = await this.prisma.tool.findMany();

    return tools;
  }

  async findById(id: string): Promise<Tool | null> {
    const tool = await this.prisma.tool.findUnique({
      where: {
        id,
      },
    });

    return tool;
  }

  async filterByTag(tag: string): Promise<Tool[]> {
    const tools = await this.prisma.tool.findMany({
      where: {
        tags: {
          has: tag,
        },
      },
    });

    return tools;
  }

  async create(props: CreateTool): Promise<void> {
    await this.prisma.tool.create({
      data: props,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.tool.delete({
      where: {
        id,
      },
    });
  }
}
