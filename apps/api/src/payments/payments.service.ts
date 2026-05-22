import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PaymentsService {
  constructor(private configService: ConfigService) {}

  generatePixPayload(amount: number, message?: string): string {
    const pixKey = this.configService.get<string>('PIX_KEY');
    const pixName = this.configService.get<string>('PIX_NAME');
    const pixCity = this.configService.get<string>('PIX_CITY');

    if (!pixKey || !pixName || !pixCity) {
      throw new InternalServerErrorException('Configurações do PIX não encontradas (PIX_KEY, PIX_NAME, PIX_CITY)');
    }

    const format = (id: string, value: string) => {
      const size = String(value.length).padStart(2, '0');
      return `${id}${size}${value}`;
    };

    const payloadFormat = format('00', '01');

    let merchantAccountInfoValue = format('00', 'br.gov.bcb.pix') + format('01', pixKey);
    if (message) {
      merchantAccountInfoValue += format('02', message.substring(0, 72));
    }
    const merchantAccountInfo = format('26', merchantAccountInfoValue);

    const merchantCategoryCode = format('52', '0000');
    const transactionCurrency = format('53', '986');
    const transactionAmount = format('54', amount.toFixed(2));
    const countryCode = format('58', 'BR');
    const merchantName = format('59', pixName.substring(0, 25));
    const merchantCity = format('60', pixCity.substring(0, 15));

    const additionalDataValue = format('05', '***');
    const additionalData = format('62', additionalDataValue);

    const payload = `${payloadFormat}${merchantAccountInfo}${merchantCategoryCode}${transactionCurrency}${transactionAmount}${countryCode}${merchantName}${merchantCity}${additionalData}6304`;

    const crc16 = this.crc16(payload);

    return payload + crc16;
  }

  private crc16(payload: string): string {
    let result = 0xFFFF;
    for (let i = 0; i < payload.length; i++) {
      result ^= payload.charCodeAt(i) << 8;
      for (let j = 0; j < 8; j++) {
        if ((result & 0x8000) !== 0) {
          result = (result << 1) ^ 0x1021;
        } else {
          result = result << 1;
        }
      }
    }
    return (result & 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
  }
}
