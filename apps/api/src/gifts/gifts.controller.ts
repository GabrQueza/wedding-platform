import { Controller, Get, Post, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { GiftsService } from './gifts.service';
import { CreateGiftDto } from './dto/create-gift.dto';
import { AdminGuard } from '../common/guards/admin.guard';

@Controller('gifts')
export class GiftsController {
  constructor(private readonly giftsService: GiftsService) {}

  @Get()
  findAllAvailable() {
    return this.giftsService.findAllAvailable();
  }

  @Post()
  @UseGuards(AdminGuard)
  create(@Body() createGiftDto: CreateGiftDto) {
    return this.giftsService.create(createGiftDto);
  }

  @Patch(':id/purchase')
  purchase(@Param('id') id: string) {
    return this.giftsService.purchase(id);
  }
}
