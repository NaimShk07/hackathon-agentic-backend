/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call */
import 'dotenv/config';

jest.mock('@thallesp/nestjs-better-auth', () => {
  const mockModule = {
    forRootAsync: () => ({
      module: class {},
      providers: [],
      exports: [],
    }),
    forRoot: () => ({
      module: class {},
      providers: [],
      exports: [],
    }),
  };
  return {
    AllowAnonymous: () => () => {},
    Session: () => () => {},
    OptionalAuth: () => () => {},
    AuthModule: mockModule,
  };
});

jest.mock('../src/lib/auth/auth.module', () => {
  const { Module } = require('@nestjs/common');
  @Module({})
  class MockAuthLibModule {}
  return {
    AuthLibModule: MockAuthLibModule,
  };
});

jest.mock('../src/lib/arcjet/arcjet.module', () => {
  const { Module } = require('@nestjs/common');
  @Module({})
  class MockArcjetModule {}
  return {
    ArcjetModule: MockArcjetModule,
  };
});

jest.mock('../src/lib/database/prisma.service', () => {
  return {
    PrismaService: class MockPrismaService {
      async onModuleInit() {}
    },
  };
});

jest.mock('@arcjet/nest', () => {
  return {
    ArcjetModule: {
      forRoot: () => ({
        module: class {},
        providers: [],
        exports: [],
      }),
    },
    ArcjetGuard: class {},
    shield: () => {},
    slidingWindow: () => {},
  };
});

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  afterEach(async () => {
    await app.close();
  });
});
