import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { GiftsService } from './gifts.service';
import { CreateGiftDto } from './dto/create-gift.dto';

@Controller('gifts')
export class GiftsController {
  constructor(private readonly giftsService: GiftsService) {}

  @Get()
  findAllAvailable() {
    return this.giftsService.findAllAvailable();
  }

  @Post()
  create(@Body() createGiftDto: CreateGiftDto) {
    return this.giftsService.create(createGiftDto);
  }

  @Patch(':id/purchase')
  purchase(@Param('id') id: string) {
    return this.giftsService.purchase(id);
  }
}
