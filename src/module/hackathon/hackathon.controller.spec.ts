/* eslint-disable @typescript-eslint/unbound-method */
jest.mock('@thallesp/nestjs-better-auth', () => ({
  AllowAnonymous: () => () => {},
  Session: () => () => {},
  OptionalAuth: () => () => {},
  AuthGuard: class {},
  Roles: () => () => {},
}));

import { Test, TestingModule } from '@nestjs/testing';
import { HackathonController } from './hackathon.controller.js';
import { HackathonService } from './hackathon.service.js';

describe('HackathonController', () => {
  let controller: HackathonController;
  let service: HackathonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HackathonController],
      providers: [
        {
          provide: HackathonService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
            join: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<HackathonController>(HackathonController);
    service = module.get<HackathonService>(HackathonService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('join', () => {
    it('should call service.join with hackathon id and user id from session', async () => {
      const mockParticipant = {
        id: 'part-1',
        hackathonId: 'hack-1',
        userId: 'user-1',
      };
      (service.join as jest.Mock).mockResolvedValue(mockParticipant);

      const mockSession = {
        user: {
          id: 'user-1',
        },
      };

      const result = await controller.join('hack-1', mockSession);

      expect(result).toEqual(mockParticipant);
      expect(service.join).toHaveBeenCalledWith('hack-1', 'user-1');
    });
  });
});
