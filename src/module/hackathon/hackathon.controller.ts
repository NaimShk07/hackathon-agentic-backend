import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { HackathonService } from './hackathon.service.js';
import { CreateHackathonDto } from './dto/create-hackathon.dto.js';
import { UpdateHackathonDto } from './dto/update-hackathon.dto.js';
import {
  AllowAnonymous,
  AuthGuard,
  Roles,
  Session,
} from '@thallesp/nestjs-better-auth';
import { ResponseMessage } from '../../common/decorators/response-message.decorator.js';

interface UserSession {
  user: {
    id: string;
  };
}

@Controller('hackathon')
export class HackathonController {
  constructor(private readonly hackathonService: HackathonService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Roles(['ADMIN'])
  @ResponseMessage('Hackathon created successfully')
  async create(
    @Body() createHackathonDto: CreateHackathonDto,
    @Session() session: UserSession,
  ) {
    const authorId = session.user.id;
    return this.hackathonService.create(createHackathonDto, authorId);
  }

  @Get()
  @AllowAnonymous()
  async findAll() {
    return this.hackathonService.findAll();
  }

  @Get(':id')
  @AllowAnonymous()
  async findOne(@Param('id') id: string) {
    return this.hackathonService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @Roles(['ADMIN'])
  @ResponseMessage('Hackathon updated successfully')
  async update(
    @Param('id') id: string,
    @Body() updateHackathonDto: UpdateHackathonDto,
  ) {
    return this.hackathonService.update(id, updateHackathonDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @Roles(['ADMIN'])
  @ResponseMessage('Hackathon deleted successfully')
  async remove(@Param('id') id: string) {
    return this.hackathonService.remove(id);
  }

  @Post(':id/join')
  @UseGuards(AuthGuard)
  @Roles(['PARTICIPANT'])
  @ResponseMessage('Joined hackathon successfully')
  async join(@Param('id') id: string, @Session() session: UserSession) {
    const userId = session.user.id;
    return this.hackathonService.join(id, userId);
  }
}
