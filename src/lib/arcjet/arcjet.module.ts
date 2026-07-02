import { Global, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import {
  ArcjetModule as NestArcjetModule,
  ArcjetGuard,
  shield,
  slidingWindow,
} from '@arcjet/nest';
import { ArcjetService } from './arcjet.service';

@Global()
@Module({
  imports: [
    NestArcjetModule.forRoot({
      isGlobal: true,
      key: process.env.ARCJET_KEY!,
      rules: [
        // Shield protects against common vulnerabilities like SQL injection, XSS, etc.
        shield({ mode: 'LIVE' }),
        // Global Rate Limiting: Max 5 requests per 10 seconds for testing
        slidingWindow({
          mode: 'LIVE',
          max: 100,
          interval: '60s',
        }),
      ],
    }),
  ],
  providers: [
    ArcjetService,
    {
      provide: APP_GUARD,
      useClass: ArcjetGuard,
    },
  ],
  exports: [ArcjetService],
})
export class ArcjetModule {}
