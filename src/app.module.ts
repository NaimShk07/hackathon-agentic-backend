import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArcjetModule } from './lib/arcjet/arcjet.module';
import { PrismaModule } from './lib/database/prisma.module';
import { UserModule } from './module/user/user.module';
import { AuthLibModule } from './lib/auth/auth.module';
import { HackathonModule } from './module/hackathon/hackathon.module';
@Module({
  imports: [
    ArcjetModule,
    PrismaModule,
    AuthLibModule,
    UserModule,
    HackathonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
