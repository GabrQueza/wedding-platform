import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRsvpDto } from './dto/create-rsvp.dto';

@Injectable()
export class RsvpService {
  constructor(private prisma: PrismaService) {}

  async create(createRsvpDto: CreateRsvpDto) {
    return this.prisma.guestRSVP.create({
      data: createRsvpDto
    });
  }
}
