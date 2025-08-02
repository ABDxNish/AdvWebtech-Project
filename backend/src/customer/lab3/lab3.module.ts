import { Module } from '@nestjs/common';
import { Lab3Service } from './lab3.service';
import { Lab3Controller } from './lab3.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCategory2 } from './Entity/UserCategoryEntity';

@Module({
  imports: [TypeOrmModule.forFeature([UserCategory2])],
  providers: [Lab3Service],
  controllers: [Lab3Controller],
})
export class Lab3Module {}
