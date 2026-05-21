import { Controller, Post, Body } from '@nestjs/common';
import { RsvpService } from './rsvp.service';
import { CreateRsvpDto } from './dto/create-rsvp.dto';

@Controller('rsvp')
export class RsvpController {
  constructor(private readonly rsvpService: RsvpService) {}

  @Post()
  create(@Body() createRsvpDto: CreateRsvpDto) {
    return this.rsvpService.create(createRsvpDto);
  }
}
