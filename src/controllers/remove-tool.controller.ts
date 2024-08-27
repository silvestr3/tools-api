import {
  Controller,
  BadRequestException,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { RemoveToolService } from 'src/services/remove-tool.service';
import { z } from 'zod';
import { ZodValidationPipe } from './pipes/zod-validation.pipe';

const RemoveToolControllerParamSchema = z.object({
  id: z.string(),
});

type RemoveToolControllerParamSchemaType = z.infer<
  typeof RemoveToolControllerParamSchema
>;
const paramValidationPipe = new ZodValidationPipe(
  RemoveToolControllerParamSchema,
);

@Controller('/tools/:id')
export class RemoveToolController {
  constructor(private removeToolService: RemoveToolService) {}

  @Delete()
  @HttpCode(204)
  async handle(
    @Param(paramValidationPipe) param: RemoveToolControllerParamSchemaType,
  ) {
    const { id } = param;

    try {
      await this.removeToolService.execute({ id });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
