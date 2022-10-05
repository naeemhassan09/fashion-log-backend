import { Expose } from 'class-transformer';
import { BaseEntity, Roles } from '../../core';
import { BeforeInsert, Column, Entity } from 'typeorm';
import { ROLE } from '../../shared';

@Entity()
export class User extends BaseEntity {
  @Expose()
  @Column()
  name: string;

  @Expose()
  @Column({ unique: true })
  email: string;

  @Expose()
  @Column({ nullable: true })
  phoneNumber: string;

  @Expose()
  @Column({ nullable: true })
  password: string;

  @Column({
    type: 'enum',
    enum: [ROLE.USER, ROLE.ADMIN],
  })
  role: string;

  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email ? this.email.toLowerCase() : this.email;
  }
}
