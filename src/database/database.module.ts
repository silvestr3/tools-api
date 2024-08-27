import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ToolsRepository } from './repositories/tools-repository';
import { PrismaToolsRepository } from './repositories/prisma/prisma-tools-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: ToolsRepository,
      useClass: PrismaToolsRepository,
    },
  ],
  exports: [ToolsRepository],
})
export class DatabaseModule {}
