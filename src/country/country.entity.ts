import { Column, Entity, PrimaryGeneratedColumn, OneToMany, CreateDateColumn } from 'typeorm';
import { City } from '../city/city.entity';
import { State } from '../state/state.entity';

@Entity('country')
export class Country {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  country_code: number;

  @Column()
  country_phone_digits: string;

  @OneToMany(() => State, state => state.id, {
    cascade: ['insert', 'update'],
  })
  states: State[];
}
