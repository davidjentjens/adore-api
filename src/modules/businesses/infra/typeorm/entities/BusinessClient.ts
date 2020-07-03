import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';

import Business from '@modules/businesses/infra/typeorm/entities/Business';
import User from '@modules/users/infra/typeorm/entities/User';
import Tier from '@modules/businesses/infra/typeorm/entities/Tier';

@Entity('business_client')
class BusinessClient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Business)
  @JoinColumn({ name: 'business_id' })
  business: Business;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'client_id' })
  client: User;

  @ManyToOne(() => Tier)
  @JoinColumn({ name: 'tier_id' })
  tier: Tier;

  @Column()
  business_id: string;

  @Column()
  client_id: string;

  @Column()
  tier_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default BusinessClient;
