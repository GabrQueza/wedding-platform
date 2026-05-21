import { IsString, IsNotEmpty, IsNumber, IsOptional, IsUrl } from 'class-validator';

export class CreateGiftDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  imageUrl: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  amazonLink?: string;
}
