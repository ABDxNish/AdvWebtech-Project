import { AdminEntity } from "src/Admin/admin.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity('Agencies')
export class AgencyEntity{
    @PrimaryGeneratedColumn({name:'Id'})
    id:number;
    @Column({name:'Name'})
    name:string;
    @Column({name:'Email'})
    email:string;
    @ManyToOne(()=>AdminEntity,admin=>admin.agencys) admin:AdminEntity;
}