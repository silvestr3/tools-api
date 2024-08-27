import { Module } from '@nestjs/common';
import { ServiceModule } from 'src/services/service.module';
import { CreateToolController } from './create-tool.controller';
import { ListToolsController } from './list-tools.controller';
import { RemoveToolController } from './remove-tool.controller';

@Module({
  imports: [ServiceModule],
  controllers: [
    CreateToolController,
    ListToolsController,
    RemoveToolController,
  ],
})
export class ControllersModule {}
