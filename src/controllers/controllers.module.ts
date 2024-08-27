import { Module } from '@nestjs/common';
import { ServiceModule } from 'src/services/service.module';
import { CreateToolController } from './create-tool.controller';
import { ListAllToolsController } from './list-all-tools.controller';

@Module({
  imports: [ServiceModule],
  controllers: [CreateToolController, ListAllToolsController],
})
export class ControllersModule {}
