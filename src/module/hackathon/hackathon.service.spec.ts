import { Test, TestingModule } from '@nestjs/testing';
import { HackathonService } from './hackathon.service.js';
import { PrismaService } from '../../lib/database/prisma.service.js';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('HackathonService', () => {
  let service: HackathonService;
  let prisma: PrismaService;

  const mockHackathon = {
    id: 'hack-1',
    name: 'Hackathon 1',
    description: 'A test hackathon description.',
    startDate: new Date(Date.now() + 1000 * 60 * 60 * 24), // tomorrow
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 48), // in 2 days
    isActive: true,
    authorId: 'author-1',
  };

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
            hackathonParticipant: {
              findUnique: jest.fn(),
              create: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<HackathonService>(HackathonService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('join', () => {
    it('should successfully join an active hackathon', async () => {
      jest
        .spyOn(prisma.hackathon, 'findUnique')
        .mockResolvedValue(mockHackathon);
      jest
        .spyOn(prisma.hackathonParticipant, 'findUnique')
        .mockResolvedValue(null);
      jest.spyOn(prisma.hackathonParticipant, 'create').mockResolvedValue({
        id: 'part-1',
        hackathonId: 'hack-1',
        userId: 'user-1',
      });

      const result = await service.join('hack-1', 'user-1');

      expect(result).toEqual({
        id: 'part-1',
        hackathonId: 'hack-1',
        userId: 'user-1',
      });
    });

    it('should throw NotFoundException if hackathon does not exist', async () => {
      jest.spyOn(prisma.hackathon, 'findUnique').mockResolvedValue(null);

      await expect(service.join('non-existent', 'user-1')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw BadRequestException if hackathon is not active', async () => {
      jest.spyOn(prisma.hackathon, 'findUnique').mockResolvedValue({
        ...mockHackathon,
        isActive: false,
      });

      await expect(service.join('hack-1', 'user-1')).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException if hackathon has already ended', async () => {
      jest.spyOn(prisma.hackathon, 'findUnique').mockResolvedValue({
        ...mockHackathon,
        endDate: new Date(Date.now() - 1000 * 60), // in the past
      });

      await expect(service.join('hack-1', 'user-1')).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException if user has already joined', async () => {
      jest
        .spyOn(prisma.hackathon, 'findUnique')
        .mockResolvedValue(mockHackathon);
      jest.spyOn(prisma.hackathonParticipant, 'findUnique').mockResolvedValue({
        id: 'part-1',
        hackathonId: 'hack-1',
        userId: 'user-1',
      });

      await expect(service.join('hack-1', 'user-1')).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
