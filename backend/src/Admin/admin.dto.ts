import { IsDate, IsDateString, IsEmail, IsIn, Matches } from "class-validator";
export class AdminData{
    id: number;
    @Matches(/^[A-Za-z]+$/,{ message: 'Name must not contain special characters' })
name: string;
uname: string;
@Matches(/^(?=.*\d).{6,}$/, { message: 'Password must be at least 6 characters long and contain at least one number' })
pass: string;

add: string;
photo:string;
}














// @Matches(/^[A-Za-z0-9 ]+$/,{ message: 'Name must not contain special characters' })
// name:string;
//  @Matches(/^(?=.*[a-z]).{6,}$/, { message: 'Password must contain at least 6 characters and one lowercase letter' })
//   password: string;

//    @Matches(/^01\d{9}$/, { message: 'Phone number must start with 01 and contain 11 digits' })
 // phone: string;

  
  
  //filename:string;
  // @IsEmail({}, { message: 'Invalid email' })
  // @Matches(/@aiub\.edu$/, { message: 'Email must be in aiub.edu domain' })
  //   email: string;
  //   @IsDateString({}, { message: 'Date must be a valid date string' })
  // birthDate: string;
  // //{} empty object reperest default email type
  // @IsIn(['male', 'female'], { message: 'Gender must be male or female' })
  // gender: string;





























//   ..?= → means: must have something.

// .* → means: "any characters", any number.

// [a-z] → means: "a small letter" (like a, b, c...z)