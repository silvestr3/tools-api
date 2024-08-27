import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { DatabaseModule } from 'src/database/database.module';
import { PrismaService } from 'src/database/prisma.service';
import request from 'supertest';

describe('Create tool (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
    }).compile();

    app = moduleRef.createNestApplication();
    prisma = moduleRef.get(PrismaService);

    await app.init();
  });

  test('[POST] /tools', async () => {
    const response = await request(app.getHttpServer()).post('/tools').send({
      title: 'Tool title',
      link: 'https://test.tool',
      description: 'This is a test tool',
      tags: [],
    });

    expect(response.statusCode).toEqual(201);

    const toolOnDatabase = await prisma.tool.findFirst({
      where: {
        title: 'Tool title',
      },
    });

    expect(toolOnDatabase).toBeTruthy();
  });
});
