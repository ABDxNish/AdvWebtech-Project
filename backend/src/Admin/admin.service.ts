import { Injectable } from "@nestjs/common";
import { isArgumentsObject } from "util/types";
import { AdminData } from "./admin.dto";
@Injectable()
export class AdminService{
    
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
    addAdmin(admindata:object){
        console.log(admindata)
        return admindata;
    }
    addAdminDto(adminData:AdminData){
        console.log(adminData.name);
        console.log(adminData.uname);
            return adminData;
    }
}