import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { GiftsModule } from './gifts/gifts.module';
import { RsvpModule } from './rsvp/rsvp.module';

@Module({
  imports: [PrismaModule, GiftsModule, RsvpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
