import { Module } from '@nestjs/common';
import { CreateToolService } from './create-tool.service';
import { FilterToolByTagService } from './filter-tool-by-tag.service';
import { ListAllToolsService } from './list-all-tools.service';
import { RemoveToolService } from './remove-tool.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [
    CreateToolService,
    FilterToolByTagService,
    ListAllToolsService,
    RemoveToolService,
  ],
  exports: [
    CreateToolService,
    FilterToolByTagService,
    ListAllToolsService,
    RemoveToolService,
  ],
})
export class ServiceModule {}
