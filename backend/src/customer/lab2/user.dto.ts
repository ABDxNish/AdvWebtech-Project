import {
  IsEmail,
  IsString,
  MinLength,
  Matches,
  IsIn,
  IsNumberString,
  IsNotEmpty,
} from 'class-validator';

export class Lab2Dto {
  @IsEmail()
  @Matches(/.*@aiub\.edu$/, { message: 'Email must be from aiub.edu domain' })
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6, { message: 'Password field must be at least 6 character long' })
  @Matches(/[A-Z]/, { message: 'it must contain one Uppercase character' })
  @IsNotEmpty()
  password: string;

  @IsIn(['male', 'female'],{message:"data must have to be male or female"})
  @IsNotEmpty()
  gender: string;

  @IsNumberString()
  @IsNotEmpty()
  phone: string;
}
