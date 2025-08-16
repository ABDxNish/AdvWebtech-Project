import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AgencyDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  company_size: number;

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
