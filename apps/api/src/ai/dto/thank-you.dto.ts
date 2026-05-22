import { IsString, IsNotEmpty } from 'class-validator';

export class ThankYouDto {
  @IsString()
  @IsNotEmpty()
  guestName: string;

  @IsString()
  @IsNotEmpty()
  giftName: string;
}
