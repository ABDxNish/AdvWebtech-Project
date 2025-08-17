import { IsEmail, Matches } from "class-validator";

export class CreateAgencyDto {
     @Matches(/^[A-Za-z]+$/,{ message: 'Name must not contain special characters' })
  name: string;

   @IsEmail({}, { message: 'Invalid email' })
  email: string;
  adminid: number;
}
