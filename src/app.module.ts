import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArcjetModule } from './lib/arcjet/arcjet.module';
import { PrismaModule } from './lib/database/prisma.module';
import { UserModule } from './module/user/user.module';
import { PostModule } from './module/post/post.module';
@Module({
  imports: [ArcjetModule, PrismaModule, UserModule, PostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
