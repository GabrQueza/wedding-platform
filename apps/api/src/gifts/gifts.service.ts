import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGiftDto } from './dto/create-gift.dto';

@Injectable()
export class GiftsService {
  constructor(private prisma: PrismaService) {}

  async findAllAvailable() {
    return this.prisma.giftItem.findMany({
      where: { isPurchased: false },
      orderBy: { createdAt: 'desc' }
    });
  }

  async create(createGiftDto: CreateGiftDto) {
    return this.prisma.giftItem.create({
      data: createGiftDto
    });
  }

  async purchase(id: string) {
    return this.prisma.giftItem.update({
      where: { id },
      data: { isPurchased: true }
    });
  }
}
