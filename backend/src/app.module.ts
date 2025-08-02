import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminController } from './Admin/admin.controller';
import { AdminModule } from './Admin/admin.module';
import { TypeOrmModule } from '@nestjs/typeorm';
<<<<<<< Updated upstream
import { CustomerController } from './customer/customer.controller';
import { CustomerService } from './customer/customer.service';
import { CustomerModule } from './customer/customer.module';
import { CustomerController } from './customer/customer.controller';
import { CustomerService } from './customer/customer.service';
=======
import { Lab3Module } from './customer/lab3/lab3.module';
import { Lab2Module } from './customer/lab2/lab2.module';
>>>>>>> Stashed changes

@Module({
  imports: [AdminModule,TypeOrmModule.forRoot(
 { type: 'postgres',
 host: 'localhost',
 port: 5432,
 username: 'postgres',
 password: 'system',
 database: 'Lab3',
 autoLoadEntities: true,
 synchronize: true,
<<<<<<< Updated upstream
 } ), CustomerModule,
=======
 } ), Lab3Module, Lab2Module,
>>>>>>> Stashed changes
],
  controllers: [AppController, CustomerController],
  providers: [AppService, CustomerService],
})
export class AppModule {}
