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
});
