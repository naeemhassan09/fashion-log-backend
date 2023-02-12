import { BaseEntity } from 'src/core/entity/base.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('company')
export class Company extends BaseEntity {
  @Column({ nullable: false })
  name: string;

  @Column({ default: false, nullable: false })
  disabled: boolean;

  @Column({ nullable: false })
  type: string;

  @Column({ nullable: false })
  email: string;
}
