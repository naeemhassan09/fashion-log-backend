import { Column, Entity, PrimaryGeneratedColumn, Index, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { City } from '../city/city.entity';
import { Country } from '../country/country.entity';

@Entity('state')
export class State {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Index()
  @ManyToOne(() => Country, country => country.id, { nullable: false, createForeignKeyConstraints: false })
  @JoinColumn({ name: 'country_id', referencedColumnName: 'id' })
  country: Country;

  @OneToMany(() => City, city => city.id, {
    cascade: ['insert', 'update'],
  })
  cities: City[];
}
