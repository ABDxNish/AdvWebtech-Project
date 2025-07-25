import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('Admins') //table will be created in this name
export class AdminEntity{
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

}