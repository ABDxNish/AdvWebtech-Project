import { Controller,Get, Param, ParseIntPipe, Post, Query,Body, UseInterceptors, UploadedFile, Res, UsePipes, ValidationPipe, Delete, Put, UseGuards, HttpException, HttpStatus } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminData, LoginDto } from "./admin.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage, MulterError } from "multer";
import { AdminEntity } from "./admin.entity";
import { AgencyEntity } from "src/Agents/Agency.entity";
import * as bcrypt from 'bcrypt';
//import { Session } from "inspector/promises";
import { Session } from '@nestjs/common';


import session from "express-session";
import { SessionGuard } from "./admin.session.guard";
@Controller('adminP') //here admin is a path

export class AdminController{
    constructor(private readonly adminService:AdminService){}

    @Get()
    getAdmin():string{
        return this.adminService.getAdmin();
    }
    @Get('/getId/:id')
    getAdminById(@Param('id')id:string):string{
            return this.adminService.getAdminById(id);
    }
    @Post('/pic')
    getPhoto():string{
        return this.adminService.getPhoto();
    }
    @Get('/photoId/:id')
    getPhotoById1(@Param('id',ParseIntPipe)id:number):string{
       return this.adminService.getPhotoById1(id);
    }
      @Post('/photoId/:id')
    getPhotoById2(@Param('id')id:number):string{
       return this.adminService.getPhotoById2(id);
    }
    @Get('/find')
    getAdminByNameAndId(@Query('name')name:string,@Query('id',ParseIntPipe)id:number):string{
        return this.adminService.getAdminByNameAndId(name,id);
    }
    @Post('/addAdmin')
    addAdmin(@Body()adminData:object):object{
        return this.adminService.addAdmin(adminData);
    }
      @Post('/addAdminDto')
    addAdminDto(@Body()adminData:AdminData):object{
        return this.adminService.addAdminDto(adminData);
    }
    @Post('/upload')
    @UseInterceptors(FileInterceptor('file'))
    Uploadfile(@UploadedFile()file:Express.Multer.File){
        console.log(file);
    }
  @Post('/UploadValidation')
   @UseInterceptors(FileInterceptor('file',{
     
    fileFilter:(req,file,cb)=>{
      if(file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
        cb(null,true);
      else{
        cb(new MulterError('LIMIT_UNEXPECTED_FILE','image'),false);
      }

    },
    limits:{fileSize:5000000},
    storage: diskStorage({
      destination: './Uploads',
      filename:function(req,file,cb){
        cb(null,Date.now()+file.originalname)
      },
    })

   }))
   uploadFileV(@UploadedFile() file: Express.Multer.File) {
 console.log(file);

}
@Get('/getimage/:name')
getImage(@Param('name')name,@Res() res){
    res.sendFile(name,{root:'./Uploads'})
}
//handling multiple operation in one route+hashing+session
@Post('/addAdminM')
@UsePipes(new ValidationPipe)
 @UseInterceptors(FileInterceptor('myfile'))
async UploadFile(@UploadedFile() file:Express.Multer.File, @Body() adminData:AdminData):Promise<object>{
  console.log(file);
  adminData.photo=file.originalname;
  const salt= await bcrypt.genSalt();
  adminData.pass= await bcrypt.hash(adminData.pass,salt);

  return this.adminService.addAdminDto(adminData);
}
@Post('/loginAdmin')
async loginSession(@Body()body: LoginDto, @Session() session){
  const { id, pass } = body;
 const admin= await this.adminService.loginSession(id,pass);
 if(!admin){
  return { message: 'User not found' };
 }
 else{
  session.ID= admin.id;
  //session.pass=check.pass;
 console.log('Session Created');
 }
}

//Lab2
// @Post('/register')
// @UsePipes(new ValidationPipe())
//    @UseInterceptors(FileInterceptor('file',{
     
//     fileFilter:(req,file,cb)=>{
//       if(file.originalname.match(/^.*\.(pdf)$/))
//         cb(null,true);
//       else{
//         cb(new MulterError('LIMIT_UNEXPECTED_FILE','image'),false);
//       }

//     },
//     limits:{fileSize:5000000},
//     storage: diskStorage({
//       destination: './Uploads', //./src/admin/uploads
//       filename:function(req,file,cb){
//         cb(null,Date.now()+file.originalname)
//       },
//     })

//    }))
//    getRegisteredData(@UploadedFile() file: Express.Multer.File,@Body()admindata:AdminData):object {
// admindata.filename=file.filename;
  
//   console.log(file);
//  console.log(admindata);
//  return this.adminService.getRegisteredData(admindata);

// }

//crud and relationship
   @Post('/getAdmin')
   getAllAdmin():object{
    return this.adminService.getAllAdmin();
   }
@Post('getAdminByName/:name')
async getAdminByName(@Param('name') name: string): Promise<AdminEntity> {
  const admin = await this.adminService.getAdminByName(name);

if (!admin) {
    throw new HttpException(
      {
        statusCode: 1001, 
        message: 'Maybe name is incorrect (This is a custom message)',
      },
      HttpStatus.FORBIDDEN, 
    );
  }

  return admin;
}


   @Put('/updateAdmin/:id')
   updateAdmin(@Param('id', ParseIntPipe) id:number, @Body()name:AdminEntity):object{
   return this.adminService.updateAdmin(id,name);
   }
   @Delete('/deleteAdmin/:id')
   deleteAdmin(@Param('id',ParseIntPipe)id:number):object{
    return this.adminService.deleteAdmin(id);
   }

   @Post('/addAgencies/:adminid')
    @UseGuards(SessionGuard)
   addAgency(@Param('adminid',ParseIntPipe) adminid:number,@Body()AgencyData:AgencyEntity, @Session() session):object{
   
    return this.adminService.createAgency(adminid,AgencyData);
   }
   @Get('/allAdminWithAgencys')
   getAllAdminAgency(): Promise<AdminEntity[]>{
    return this.adminService.getAllAdminWitAgency();
   }
   @Post('/getAgencyByAdminId/:adminid')
   getAgencyByAdminId(@Param('adminid',ParseIntPipe) id:number):Promise<AgencyEntity[]>{
  return this.adminService.getAgencyByAdminId(id);
   }


  //lab3
  // @Post('/createAgency')
  // createAgency(@Body() agencyData:AgencyEntity):object{
  //   return this.adminService.createAgency(agencyData);
  // }
  // @Post('/updateCountry/:id')
  // updateCountr(@Param('id',ParseIntPipe)id:number, @Body()country:AgencyEntity){
  //   return this.adminService.updateCountry(id,country);
  // }
  // @Post('/getAgencyByDate/:date')
  // getAgencyByDate(@Param('date') date:string){
  //   return this.adminService.getAgencyByDate(date)
  // }
  // @Post('/unknownCountry')
  // getUnknownCountry(){
  //   return this.adminService.getAgencyUnknownCountry();
  // }
  

}