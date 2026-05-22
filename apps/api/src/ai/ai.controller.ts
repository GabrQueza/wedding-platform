import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AiService } from './ai.service';
import { ChatDto } from './dto/chat.dto';
import { ThankYouDto } from './dto/thank-you.dto';
import { AdminGuard } from '../common/guards/admin.guard';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('chat')
  async chat(@Body() chatDto: ChatDto) {
    const response = await this.aiService.chatWithGuest(chatDto.message);
    return { response };
  }

  @Post('thank-you')
  @UseGuards(AdminGuard)
  async thankYou(@Body() thankYouDto: ThankYouDto) {
    const response = await this.aiService.generateThankYouNote(
      thankYouDto.guestName,
      thankYouDto.giftName,
    );
    return { response };
  }
}
