import { Column, Entity, PrimaryGeneratedColumn, OneToMany, Index, ManyToOne, JoinColumn } from 'typeorm';
import { State } from '../state/state.entity';

@Entity('city')
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Index()
  @ManyToOne(() => State, state => state.id, { nullable: false, createForeignKeyConstraints: false })
  @JoinColumn({ name: 'state_id', referencedColumnName: 'id' })
  state: State;
}
