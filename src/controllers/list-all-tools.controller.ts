import { Controller, BadRequestException, Get } from '@nestjs/common';
import { ListAllToolsService } from 'src/services/list-all-tools.service';

@Controller('/tools')
export class ListAllToolsController {
  constructor(private listAllToolsService: ListAllToolsService) {}

  @Get()
  async handle() {
    try {
      const { tools } = await this.listAllToolsService.execute();

      return { tools };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
