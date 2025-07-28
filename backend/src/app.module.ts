import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminController } from './Admin/admin.controller';
import { AdminModule } from './Admin/admin.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [AdminModule,TypeOrmModule.forRoot(
 { type: 'postgres',
 host: 'localhost',
 port: 5432,
 username: 'postgres',
 password: 'KHNISHAT172',
 database: 'AdminProject',// database name
 autoLoadEntities: true,
 synchronize: true,
 } ),
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
