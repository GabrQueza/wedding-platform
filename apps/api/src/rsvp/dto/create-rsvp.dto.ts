import { IsString, IsNotEmpty, IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class CreateRsvpDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsBoolean()
  @IsNotEmpty()
  isAttending: boolean;

  @IsNumber()
  @IsNotEmpty()
  numberOfCompanions: number;

  @IsOptional()
  @IsString()
  message?: string;
}
