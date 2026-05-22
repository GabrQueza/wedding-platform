import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePixDto {
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsOptional()
  message?: string;
}
