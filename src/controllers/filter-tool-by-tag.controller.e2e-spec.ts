import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { DatabaseModule } from 'src/database/database.module';
import { PrismaService } from 'src/database/prisma.service';
import request from 'supertest';

describe('Filter tools by tag (E2E)', () => {
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

  test('[GET] /tools?tag=[tag]', async () => {
    await prisma.tool.createMany({
      data: [
        {
          title: 'Tool title',
          link: 'https://test.tool',
          description: 'This is a test tool',
          tags: ['nest'],
        },
        {
          title: 'Tool title 2',
          link: 'https://test.tool',
          description: 'This is a second test tool',
          tags: ['node'],
        },
      ],
    });

    const response = await request(app.getHttpServer())
      .get('/tools?tag=nest')
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.tools).toHaveLength(1);
  });
});
