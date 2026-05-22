import { Controller, Post, Body } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePixDto } from './dto/create-pix.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('pix')
  createPix(@Body() createPixDto: CreatePixDto) {
    const pixPayload = this.paymentsService.generatePixPayload(
      createPixDto.amount,
      createPixDto.message,
    );
    return { pixPayload };
  }
}
