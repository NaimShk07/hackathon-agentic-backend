import { Injectable } from '@nestjs/common';
import { CreateHackathonDto } from './dto/create-hackathon.dto';
import { UpdateHackathonDto } from './dto/update-hackathon.dto';

@Injectable()
export class HackathonService {
  create(_createHackathonDto: CreateHackathonDto) {
    return 'This action adds a new hackathon';
  }

  findAll() {
    return `This action returns all hackathon`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hackathon`;
  }

  update(id: number, _updateHackathonDto: UpdateHackathonDto) {
    return `This action updates a #${id} hackathon`;
  }

  remove(id: number) {
    return `This action removes a #${id} hackathon`;
  }
}
