import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../../../generated/prisma/client.js';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      accelerateUrl: process.env.DATABASE_URL as string,
    });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
