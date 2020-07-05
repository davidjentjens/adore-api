import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';

import BusinessPost from '@modules/businesses/infra/typeorm/entities/BusinessPost';
import User from '@modules/users/infra/typeorm/entities/User';

@Entity('like')
class Like {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => BusinessPost)
  @JoinColumn({ name: 'business_post_id' })
  business_post: BusinessPost;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'client_id' })
  client: User;

  @Column()
  business_post_id: string;

  @Column()
  client_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Like;
