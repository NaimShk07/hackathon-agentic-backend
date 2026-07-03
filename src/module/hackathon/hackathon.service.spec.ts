import { Test, TestingModule } from '@nestjs/testing';
import { HackathonService } from './hackathon.service.js';
import { PrismaService } from '../../lib/database/prisma.service.js';

describe('HackathonService', () => {
  let service: HackathonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HackathonService,
        {
          provide: PrismaService,
          useValue: {
            hackathon: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<HackathonService>(HackathonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
