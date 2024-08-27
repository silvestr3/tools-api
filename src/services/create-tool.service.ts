import { Injectable } from '@nestjs/common';
import { CreateTool, ToolsRepository } from 'src/database/tools-repository';

@Injectable()
export class CreateToolService {
  constructor(private toolsRepository: ToolsRepository) {}

  async execute(params: CreateTool) {
    await this.toolsRepository.create(params);
  }
}
