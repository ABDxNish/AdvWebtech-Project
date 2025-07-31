import { Controller,Module } from "@nestjs/common";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminEntity } from "./admin.entity";
import { AgencyEntity } from "src/Agents/Agency.entity";

@Module({
    imports:[TypeOrmModule.forFeature([AdminEntity,AgencyEntity])],
    controllers:[AdminController],
providers:[AdminService]
})
export class AdminModule{}