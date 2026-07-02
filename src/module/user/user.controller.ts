import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { AllowAnonymous, AuthGuard, Roles } from '@thallesp/nestjs-better-auth';
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

  @Get('all')
  @UseGuards(AuthGuard)
  @Roles(['admin'])
  async getAllUsers(): Promise<UserModel[]> {
    return this.userService.users({});
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async getUserById(@Param('id') id: string): Promise<UserModel> {
    const user = await this.userService.user({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }
}
