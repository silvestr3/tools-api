import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from './pipes/zod-validation.pipe';
import { CreateToolService } from 'src/services/create-tool.service';

const CreateToolSchema = z.object({
  title: z.string(),
  link: z.string().url(),
  description: z.string(),
  tags: z.array(z.string()),
});

type CreateToolSchemaType = z.infer<typeof CreateToolSchema>;
const bodyValidationPipe = new ZodValidationPipe(CreateToolSchema);

@Controller('/tools')
export class CreateToolController {
  constructor(private createToolService: CreateToolService) {}

  @Post()
  async handle(@Body(bodyValidationPipe) body: CreateToolSchemaType) {
    const { description, link, tags, title } = body;

    try {
      await this.createToolService.execute({
        title,
        description,
        link,
        tags,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
