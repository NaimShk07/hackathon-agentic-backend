import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHackathonDto } from './dto/create-hackathon.dto.js';
import { UpdateHackathonDto } from './dto/update-hackathon.dto.js';
import { PrismaService } from '../../lib/database/prisma.service.js';
import { Hackathon, Prisma } from '../../../generated/prisma/client.js';

@Injectable()
export class HackathonService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateHackathonDto, authorId: string): Promise<Hackathon> {
    return this.prisma.hackathon.create({
      data: {
        name: data.name,
        description: data.description,
        startDate: data.startsAt,
        endDate: data.endsAt,
        isActive: data.isActive ?? true,
        author: {
          connect: { id: authorId },
        },
      },
    });
  }

  async findAll(): Promise<Hackathon[]> {
    return this.prisma.hackathon.findMany();
  }

  async findOne(id: string): Promise<Hackathon> {
    const hackathon = await this.prisma.hackathon.findUnique({
      where: { id },
    });
    if (!hackathon) {
      throw new NotFoundException(`Hackathon with ID ${id} not found`);
    }
    return hackathon;
  }

  async update(id: string, data: UpdateHackathonDto): Promise<Hackathon> {
    await this.findOne(id);

    const updateData: Prisma.HackathonUpdateInput = {};
    if (data.name !== undefined) updateData.name = data.name;
    if (data.description !== undefined)
      updateData.description = data.description;
    if (data.startsAt !== undefined) updateData.startDate = data.startsAt;
    if (data.endsAt !== undefined) updateData.endDate = data.endsAt;
    if (data.isActive !== undefined) updateData.isActive = data.isActive;

    return this.prisma.hackathon.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(id: string): Promise<Hackathon> {
    await this.findOne(id);
    return this.prisma.hackathon.delete({
      where: { id },
    });
  }
}
