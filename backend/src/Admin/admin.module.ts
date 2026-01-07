import { Controller,Module } from "@nestjs/common";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminEntity } from "./admin.entity";
import { AgencyEntity } from "src/Agents/Agency.entity";
import { MailerModule } from "@nestjs-modules/mailer";

@Module({
      imports: [
    TypeOrmModule.forFeature([AdminEntity, AgencyEntity]),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        ignoreTLS: true,
        secure: true,
        auth: {
          user: 'pw728574@gmail.com', 
          pass: 'zizfxdcqjgsspdzv',  
      },
    },
    }),
  ],
    controllers:[AdminController],
providers:[AdminService]
})
export class AdminModule{}