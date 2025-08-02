import { Injectable } from '@nestjs/common';
import { Lab2Dto } from './user.dto';

@Injectable()
export class Lab2Service {
     private users: Lab2Dto[] = [];

  createUser(userData: Lab2Dto) {
    // Simple duplicate check
    if (this.users.some(user => user.email === userData.email)) {
      throw new Error('Email already exists');
    }
    this.users.push(userData);
    return userData;
  }

  getAllUsers() {
    return this.users;
  }
}
