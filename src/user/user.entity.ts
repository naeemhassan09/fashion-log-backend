import { BaseEntity } from '../core/entity/base.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('user')
export class User extends BaseEntity {
  @Column({ nullable: false })
  first_name: string;

  @Column({ nullable: true })
  last_name: string;

  @Column({ nullable: false })
  phone: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  cnic_number: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: true })
  profile_picture_url: string;

  @Column({ default: false })
  force_logout: boolean;
}
