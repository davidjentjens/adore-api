import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Perk from '@modules/businesses/infra/typeorm/entities/Perk';

@Entity('delivery')
class Delivery {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  perk_id: string;

  @ManyToOne(() => Perk)
  @JoinColumn({ name: 'perk_id' })
  perk: Perk;

  @Column('time with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Delivery;
