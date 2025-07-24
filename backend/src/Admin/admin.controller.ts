import { Controller,Get, Param, ParseIntPipe, Post, Query } from "@nestjs/common";
import { AdminService } from "./admin.service";
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

}