import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import Category from '@modules/businesses/infra/typeorm/entities/Category';

@Entity('business')
class Business {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  category_id: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column()
  name: string;

  @Column()
  desc: string;

  @Column()
  email: string;

  @Column()
  logo_url: string;

  @Column()
  image_url: string;

  @Column('bool')
  featured: boolean;

  @Column()
  owner_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'owner_id' })
  creator: User;

  @Column({ type: 'decimal', scale: 7 })
  latitude: number;

  @Column({ type: 'decimal', scale: 7 })
  longitude: number;

  @Column()
  whatsapp: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Business;
