import { AdminEntity } from "src/Admin/admin.entity";

import { BeforeInsert, Column, Entity, Generated, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity('Agencies')
//@Entity('AgenciesT')
export class AgencyEntity{
    @PrimaryGeneratedColumn({name:'Id'})
    id:number;
    @Column({name:'Name'})
    name:string;
    @Column({name:'Email'})
    email:string;
    //@ManyToOne(()=>AdminEntity,admin=>admin.agencys) admin:AdminEntity;
     @ManyToOne(() => AdminEntity, admin => admin.agencys, { onDelete: 'CASCADE' })
    admin: AdminEntity;
    //length: 150
    // @Column({name:'Uuid',type: 'uuid'})
    // @Generated('uuid')
    // uuid:string;
    
    // @Column({name:'Joining Date',type:'timestamp',default:()=>'CURRENT_TIMESTAMP'})
    // date:string;
    // @Column({name:'Country',type:'varchar',length:30,default:'Unknown'})
    // country:string;

  

}


