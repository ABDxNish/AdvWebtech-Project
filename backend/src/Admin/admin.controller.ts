import { Controller,Get, Param, ParseIntPipe, Post, Query,Body, UseInterceptors, UploadedFile, Res, UsePipes, ValidationPipe } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminData } from "./admin.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage, MulterError } from "multer";
import { AdminEntity } from "./admin.entity";
import { AgencyEntity } from "src/Agents/Agency.entity";
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
//handling multiple operation in one route
@Post('/addAdminM')
@UsePipes(new ValidationPipe)
 @UseInterceptors(FileInterceptor('myfile'))
UploadFile(@UploadedFile() file:Express.Multer.File, @Body() adminData:AdminData):object{
  console.log(file);
  adminData.photo=file.originalname;
  return this.adminService.addAdminDto(adminData);
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


   @Post('/getAdmin')
   getAllAdmin():object{
    return this.adminService.getAllAdmin();
   }
   @Post('getAdminByName/:name')
   getAdminByName(@Param('name') name:string):object{
    return this.adminService.getAdminByName(name);
   }
   @Post('/updateAdmin/:id')
   updateAdmin(@Param('id', ParseIntPipe) id:number, @Body()name:AdminEntity):object{
   return this.adminService.updateAdmin(id,name);
   }
   @Post('/deleteAdmin/:id')
   deleteAdmin(@Param('id',ParseIntPipe)id:number):object{
    return this.adminService.deleteAdmin(id);
   }

   @Post('/addAgencies/:adminid')
   addAgency(@Param('adminid',ParseIntPipe) adminid:number,@Body()AgencyData:AgencyEntity):object{
   
    return this.adminService.createAgency(adminid,AgencyData);
   }
}