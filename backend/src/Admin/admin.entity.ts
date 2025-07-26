import { Column, Entity, PrimaryColumn } from "typeorm";
import { AdminData } from "./admin.dto";

@Entity('Admins') //table will be created in this name
export class AdminEntity{
    save(adminData: AdminData) {
        throw new Error("Method not implemented.");
    }
         @PrimaryColumn({name:'ID'})
         id:number;
         @Column({name:'Name'})
         name:string;
         @Column({name:'UserName'})
         uname:string;
         @Column({name:'Password'})
         pass:string;
         @Column({name:'Address'})
         add:string;
          @Column({name:'Dp'})
         photo:string;

}