import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class PackageDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  price: number;
}
