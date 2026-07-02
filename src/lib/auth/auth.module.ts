import { Global, Module } from '@nestjs/common';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { PrismaService } from '../database/prisma.service';
import { authOptions } from './auth';

@Global()
@Module({
  imports: [
    AuthModule.forRootAsync({
      imports: [],
      inject: [PrismaService],
      useFactory: (prisma: PrismaService) => {
        return {
          auth: betterAuth({
            database: prismaAdapter(prisma, {
              provider: 'postgresql',
            }),
            ...authOptions,
          }),
          bodyParser: {
            json: {},
            urlencoded: { extended: true },
          },
        };
      },
    }),
  ],
  exports: [AuthModule],
})
export class AuthLibModule {}
