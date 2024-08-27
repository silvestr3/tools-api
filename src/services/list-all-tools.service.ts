import { Injectable } from '@nestjs/common';
import { ToolsRepository } from 'src/database/tools-repository';

@Injectable()
export class ListAllToolsService {
  constructor(private toolsRepository: ToolsRepository) {}

  async execute() {
    const tools = await this.toolsRepository.getAll();

    return { tools };
  }
}
