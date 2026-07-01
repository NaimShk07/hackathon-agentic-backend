import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service.js';
import { User as UserModel } from '../../../generated/prisma/client.js';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async signupUser(
    @Body() userData: { name?: string; email: string },
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }
}
