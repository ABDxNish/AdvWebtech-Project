import { Module } from '@nestjs/common';
import { Lab2Service } from './lab2.service';
import { Lab2Controller } from './lab2.controller';

@Module({
  providers: [Lab2Service],
  controllers: [Lab2Controller]
})
export class Lab2Module {}
