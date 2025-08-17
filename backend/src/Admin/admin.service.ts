import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { isArgumentsObject } from "util/types";
import { AdminData } from "./admin.dto";
import { AdminEntity } from "./admin.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { promises } from "dns";
import { AgencyEntity } from "src/Agents/Agency.entity";
import { error } from "console";
import * as bcrypt from 'bcrypt';
import { MailerService } from "@nestjs-modules/mailer";
@Injectable()
export class AdminService{
    constructor(@InjectRepository(AdminEntity)private adminRepository:Repository<AdminEntity>,@InjectRepository(AgencyEntity) private agencyRepository:Repository<AgencyEntity>,private mailerService: MailerService){}
  
    
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
    //project
    addAdmin(admindata:object){
        console.log(admindata)
        return admindata;
    }
    async addAdminDto(adminData:AdminData): Promise<object>{
    //      console.log(adminData.name);
    //      console.log(adminData.uname);
    //    console.log(adminData.photo);
      

   const admin= await this.adminRepository.save(adminData);
 
    await this.mailerService.sendMail({
      to: 'pm5612356@gmail.com',
      subject: 'New Admin Added',
      text: 'A new admin has been added. ID: '+ admin.id,
    });
             return admin;
    }
    getRegisteredData(admindata:AdminData):object{
        console.log(admindata);
        return admindata;
    }

    //relationship and crud
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
      async getAdminByIDSes(id:number): Promise<AdminEntity    | null> {
    return this.adminRepository.findOneBy({id})
   }
   async loginSession(id,pass): Promise<AdminEntity    | null> {
    const check= await this.adminRepository.findOneBy({id:id});
    if(!check){
       // throw new Error('Admin Not Found! Please Check With Valid Id');
        throw new HttpException(
      {
        statusCode: 1001, 
        message: 'Admin Not Found! Please Check With Valid Id (This is a custom message)',
      },
      HttpStatus.FORBIDDEN, 
    );
    }
    else{
        const isMatch= await bcrypt.compare(pass,check.pass);
        if(!isMatch){
           throw new HttpException(
                 {
                   statusCode: 2107, 
                   message: 'Maybe password is incorrect (This is a custom message)',
                 },
                 HttpStatus.FORBIDDEN, 
               );
            console.log('Wrong Password');

        }
        else{

            return check;
        }
    }
   }
  async updateAdmin(id:number, name:AdminEntity): Promise<AdminEntity | null>{
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
   getAllAdminWitAgency():Promise<AdminEntity[]>{
    return this.adminRepository.find({relations:['agencys']});
   }
   getAgencyByAdminId(adminid:number):Promise<AgencyEntity[]>{
    return this.agencyRepository.find({where:{admin:{id:adminid}}})
   }

async countAgencies(): Promise<{ count: number }> {
  const count = await this.agencyRepository.count();
  return { count };
}


async updateAgency(id: number,updateData: { name, email }): Promise<AgencyEntity> {
  const agency = await this.agencyRepository.findOneBy({ id });
  if (!agency) {
    throw new HttpException(
      { statusCode: 404, 
        message: 'Agency not found' },
      HttpStatus.NOT_FOUND,
    );
  }



 await this.agencyRepository.update(id, {
  name: updateData.name,
  email: updateData.email,
});

  return agency;
}


//lab3
//  async createAgency(agencyData:AgencyEntity): Promise<AgencyEntity>{
    
//     return this.agencyRepository.save(agencyData);
//     console.log("AgencyAdded");
//  }
//  async updateCountry(id:number,country:AgencyEntity): Promise<AgencyEntity | null >{
//   const check= await this.agencyRepository.findOneBy({id:id});
//   if(!check ){
//     throw new Error("Agency Id Not Found!")
//   }
//   else{
//    await this.agencyRepository.update(id,country);
//    console.log('Update complete');
//    return this.agencyRepository.findOneBy({id:id});

//   }
   
//   }
// getAgencyByDate(joiningDate: string): Promise<AgencyEntity[]> {
//   return this.agencyRepository.find({
//     where: {
//       date: joiningDate,
//     },
//   });
// }
// async getAgencyUnknownCountry():Promise<AgencyEntity[]>{
//     return this.agencyRepository.find({where:{country:'Unknown'}});
// }

}
