import { Injectable } from "@nestjs/common";
import { isArgumentsObject } from "util/types";
import { AdminData } from "./admin.dto";
import { AdminEntity } from "./admin.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { promises } from "dns";
import { AgencyEntity } from "src/Agents/Agency.entity";
@Injectable()
export class AdminService{
    constructor(@InjectRepository(AdminEntity)private adminRepository:Repository<AdminEntity>,@InjectRepository(AgencyEntity) private agencyRepository:Repository<AgencyEntity>){}
  
    
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
    addAdminDto(adminData:AdminData): object{
         console.log(adminData.name);
         console.log(adminData.uname);
       console.log(adminData.photo);
    //    this.adminRepository.save({
    //    id: adminData.id,
    //      name: adminData.name,
    //      uname: adminData.uname,
    //      pass: adminData.pass,
    //     add: adminData.add,
    //      photo: adminData.fileName, // Assigning fileName to photo column
    //  });
    this.adminRepository.save(adminData);
             return adminData;
    }
    // getRegisteredData(admindata:AdminData):object{
    //     console.log(admindata);
    //     return admindata;
    // }
    async getAllAdmin(): Promise<AdminEntity[]>{
       //return this.adminRepository.find();
       return this.adminRepository.find({
        order:{
            
            id:"DESC"
        }
       })
    }
   async getAdminByName(name:string): Promise<AdminEntity    | null> {
    return this.adminRepository.findOneBy({name:name})
   }
  async updateAdmin(id:number, name:Partial<AdminEntity>): Promise<AdminEntity | null>{
  await this.adminRepository.update(id,name);
   return this.adminRepository.findOneBy({id:id});
   console.log('Update complete');
   }
   async deleteAdmin(id:number):Promise<void>{
    await this.adminRepository.delete(id);
   }

   async createAgency(adminid:number,AgencyData:AgencyEntity):Promise<AgencyEntity | null>{
    const admin=await this.adminRepository.findOneBy({id:adminid});
    if(!admin){  throw new Error('Admin not found');}
    else{
    AgencyData.admin=admin;
    }
    return this.agencyRepository.save(AgencyData);
   }

}
