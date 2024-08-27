import { Injectable } from '@nestjs/common';
import { ToolsRepository } from 'src/database/tools-repository';

interface FilterToolByTagServiceParams {
  tag: string;
}

@Injectable()
export class FilterToolByTagService {
  constructor(private toolsRepository: ToolsRepository) {}

  async execute({ tag }: FilterToolByTagServiceParams) {
    const tools = await this.toolsRepository.filterByTag(tag);

    return { tools };
  }
}
