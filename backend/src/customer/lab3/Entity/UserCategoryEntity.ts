import {
  Entity,
  Column,
  BeforeInsert,
  PrimaryColumn,
} from 'typeorm';

import * as crypto from 'crypto';

@Entity('user_category2')
export class UserCategory2 {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'varchar', nullable: true })
  fullName?: string;

  @Column({ type: 'bigint', unsigned: true })
  phone: number;

  @BeforeInsert()
  generateId() {
    this.id = this.id || crypto.randomUUID();
  }
}
