/* eslint-disable @typescript-eslint/unbound-method */
jest.mock('@thallesp/nestjs-better-auth', () => ({
  AllowAnonymous: () => () => {},
  Session: () => () => {},
  OptionalAuth: () => () => {},
  AuthGuard: class {},
  Roles: () => () => {},
}));

import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller.js';
import { UserService } from './user.service.js';
import { NotFoundException } from '@nestjs/common';
import { User as UserModel, Prisma } from '../../../generated/prisma/client.js';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  const mockUser: UserModel = {
    id: 'user-1',
    email: 'test@example.com',
    name: 'Test User',
    emailVerified: false,
    image: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    role: 'PARTICIPANT',
  };

  const mockAdmin: UserModel = {
    id: 'user-2',
    email: 'admin@example.com',
    name: 'Admin User',
    emailVerified: true,
    image: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    role: 'admin',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            createUser: jest.fn().mockResolvedValue(mockUser),
            users: jest.fn().mockResolvedValue([mockUser, mockAdmin]),
            user: jest
              .fn()
              .mockImplementation((where: Prisma.UserWhereUniqueInput) => {
                if (where?.id === 'user-1') {
                  return Promise.resolve(mockUser);
                }
                return Promise.resolve(null);
              }),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('signupUser', () => {
    it('should create and return a user', async () => {
      const result = await controller.signupUser({
        name: 'Test User',
        email: 'test@example.com',
      });
      expect(result).toEqual(mockUser);
      expect(service.createUser).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'Test User',
          email: 'test@example.com',
        }),
      );
    });
  });

  describe('getAllUsers', () => {
    it('should return all users', async () => {
      const result = await controller.getAllUsers();
      expect(result).toEqual([mockUser, mockAdmin]);
      expect(service.users).toHaveBeenCalled();
    });
  });

  describe('getUserById', () => {
    it('should return a user if found', async () => {
      const result = await controller.getUserById('user-1');
      expect(result).toEqual(mockUser);
      expect(service.user).toHaveBeenCalledWith({ id: 'user-1' });
    });

    it('should throw NotFoundException if user is not found', async () => {
      await expect(controller.getUserById('non-existent')).rejects.toThrow(
        NotFoundException,
      );
      expect(service.user).toHaveBeenCalledWith({ id: 'non-existent' });
    });
  });
});
