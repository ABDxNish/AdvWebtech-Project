import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class EditAgencyProfileDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  company_size: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  phone_no: string;

  @IsNotEmpty()
  @IsString()
  status: string;
}