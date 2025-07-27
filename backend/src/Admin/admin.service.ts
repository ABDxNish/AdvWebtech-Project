import { Injectable } from "@nestjs/common";
import { isArgumentsObject } from "util/types";
import { AdminData } from "./admin.dto";
import { AdminEntity } from "./admin.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
@Injectable()
export class AdminService{
    constructor(@InjectRepository(AdminEntity)private adminRepository:Repository<AdminEntity>){}
    
        getAdmin():string{
        return "Hello Admin";
    }
    getAdminById(id:string):string{
        return "Admin Id" +id;
    }
    getPhoto():string{
        return "All photos added Post Method";
    }
    getPhotoById1(id:number):string{
        console.log(typeof(id));
        return "Photo id is(get)="+id;
    }
      getPhotoById2(id:number):string{
        return "Photo id is(post)="+id;
    }
    getAdminByNameAndId(name,id){
        console.log(typeof(id));
         console.log(typeof(name));
        return 'Admin Name:' + name + ', Admin id:' + id;
    }
    // addAdmin(admindata:object){
    //     console.log(admindata)
    //     return admindata;
    // }
    // addAdminDto(adminData:AdminData): object{
    //      console.log(adminData.name);
    //      console.log(adminData.uname);
    //    console.log(adminData.fileName);
    //    this.adminRepository.save({
    //    id: adminData.id,
    //      name: adminData.name,
    //      uname: adminData.uname,
    //      pass: adminData.pass,
    //     add: adminData.add,
    //      photo: adminData.fileName, // Assigning fileName to photo column
    //  });
    //          return adminData;
    // }
    getRegisteredData(admindata:AdminData):object{
        console.log(admindata);
        return admindata;
    }
   

}