import { Injectable } from '@nestjs/common';
import { ToolsRepository } from 'src/database/repositories/tools-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface RemoveToolServiceParams {
  id: string;
}

@Injectable()
export class RemoveToolService {
  constructor(private toolsRepository: ToolsRepository) {}

  async execute({ id }: RemoveToolServiceParams) {
    const tool = await this.toolsRepository.findById(id);

    if (!tool) {
      throw new ResourceNotFoundError();
    }

    await this.toolsRepository.delete(id);
  }
}
