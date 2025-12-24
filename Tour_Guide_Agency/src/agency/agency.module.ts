import { Module } from '@nestjs/common';
import { AgencyService } from './agency.service';
import { AgencyController } from './agency.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  BLOG_INFO,
  COMMENT_INFO,
  AGENCY_INFO,
  BOOKING_INFO,
  DESTINATION_INFO,
  LOGIN_INFO,
  PACKAGE_INFO,
  PAYMENT_INFO,
  REVIEW_INFO,
  TRANSPORT_INFO,
  USER_INFO,
} from './DB.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/email/email.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Sarmin@&Souriya44637',
      database: 'backend',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([
      BLOG_INFO,
      COMMENT_INFO,
      LOGIN_INFO,
      USER_INFO,
      AGENCY_INFO,
      BOOKING_INFO,
      PACKAGE_INFO,
      TRANSPORT_INFO,
      DESTINATION_INFO,
      REVIEW_INFO,
      PAYMENT_INFO,
    ]),
    JwtModule.register({ secret: process.env.ACCESS_TOKEN_SECRET }),
  ],

  controllers: [AgencyController],
  providers: [AgencyService, 
    JwtService,
    EmailService
  ],
})
export class AgencyModule {}
