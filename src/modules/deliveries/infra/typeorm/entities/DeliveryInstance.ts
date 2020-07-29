import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Delivery from '@modules/deliveries/infra/typeorm/entities/Delivery';
import User from '@modules/users/infra/typeorm/entities/User';

@Entity('delivery_instance')
class DeliveryInstance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  delivery_id: string;

  @ManyToOne(() => Delivery)
  @JoinColumn({ name: 'delivery_id' })
  delivery: Delivery;

  @Column()
  client_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'client_id' })
  client: User;

  @Column()
  status: 'preparing' | 'shipping' | 'delivered' | 'pending' | 'blocked';

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default DeliveryInstance;
