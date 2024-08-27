import { Controller, BadRequestException, Get, Query } from '@nestjs/common';
import { ListAllToolsService } from 'src/services/list-all-tools.service';
import { z } from 'zod';
import { ZodValidationPipe } from './pipes/zod-validation.pipe';
import { FilterToolByTagService } from 'src/services/filter-tool-by-tag.service';

const FilterToolsByTagQuerySchema = z.object({
  tag: z.string().optional(),
});

type FilterToolsByTagQuerySchemaType = z.infer<
  typeof FilterToolsByTagQuerySchema
>;
const queryValidationPipe = new ZodValidationPipe(FilterToolsByTagQuerySchema);

@Controller('/tools')
export class ListToolsController {
  constructor(
    private listAllToolsService: ListAllToolsService,
    private filterToolByTagService: FilterToolByTagService,
  ) {}

  @Get()
  async handle(
    @Query(queryValidationPipe) query: FilterToolsByTagQuerySchemaType,
  ) {
    const { tag } = query;

    try {
      if (tag) {
        const { tools } = await this.filterToolByTagService.execute({ tag });
        return { tools };
      } else {
        const { tools } = await this.listAllToolsService.execute();
        return { tools };
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
