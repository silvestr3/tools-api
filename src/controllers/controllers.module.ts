import { Module } from '@nestjs/common';
import { ServiceModule } from 'src/services/service.module';
import { CreateToolController } from './create-tool.controller';

@Module({
  imports: [ServiceModule],
  controllers: [CreateToolController],
})
export class ControllersModule {}
