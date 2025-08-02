import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Lab2Service } from './lab2.service';
import { Lab2Dto } from './user.dto';


@Controller('lab2')
export class Lab2Controller {
     constructor(private readonly appService: Lab2Service) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() userData: Lab2Dto) {
    return this.appService.createUser(userData);
  }

  @Get()
  findAll() {
    return this.appService.getAllUsers();
  }
}
