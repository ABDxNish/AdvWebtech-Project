import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { AdminData } from "./admin.dto";
import { AgencyEntity } from "src/Agents/Agency.entity";

@Entity('Admins') //table will be created in this name
export class AdminEntity{
    
         @PrimaryGeneratedColumn({name:'ID'})
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
         
        @OneToMany(()=>AgencyEntity,agency=>agency.admin,{cascade:true}) agencys:AgencyEntity[];

}