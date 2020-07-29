import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';

import Tier from '@modules/businesses/infra/typeorm/entities/Tier';

@Entity('perk')
class Perk {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  desc: string;

  @Column()
  image_url: string;

  @ManyToOne(() => Tier)
  @JoinColumn({ name: 'tier_id' })
  tier: Tier;

  @Column()
  tier_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Perk;
