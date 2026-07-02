import { Controller, Post, Body } from '@nestjs/common';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';
import { UserService } from './user.service.js';
import { User as UserModel } from '../../../generated/prisma/client.js';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @AllowAnonymous()
  async signupUser(
    @Body() userData: { name: string; email: string },
  ): Promise<UserModel> {
    return this.userService.createUser({
      name: userData.name,
      email: userData.email,
      emailVerified: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}
