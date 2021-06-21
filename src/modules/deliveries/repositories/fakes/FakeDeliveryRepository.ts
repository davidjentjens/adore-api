import { uuid } from 'uuidv4';

import IDeliveryDTO from '@modules/deliveries/dtos/IDeliveryDTO';
import IDeliveryRepository from '../IDeliveryRepository';

import Delivery from '../../infra/typeorm/entities/Delivery';

class FakeDeliveryRepository implements IDeliveryRepository {
  private deliveries: Delivery[] = [];

  public async create(deliveryData: IDeliveryDTO): Promise<Delivery> {
    const delivery = new Delivery();

    Object.assign(delivery, { id: uuid() }, deliveryData);

    this.deliveries.push(delivery);

    return delivery;
  }

  public async findById(delivery_id: string): Promise<Delivery | undefined> {
    const findDelivery = this.deliveries.find(
      delivery => delivery.id === delivery_id,
    );

    return findDelivery;
  }

  public async findByPerk(perk_id: string): Promise<Delivery[]> {
    const findDeliveries = this.deliveries.filter(
      delivery => delivery.perk_id === perk_id,
    );

    return findDeliveries;
  }

  public async save(delivery: Delivery): Promise<Delivery> {
    const findIndex = this.deliveries.findIndex(
      findDelivery => findDelivery.id === delivery.id,
    );

    this.deliveries[findIndex] = delivery;

    return delivery;
  }

  public async delete(delivery_id: string): Promise<void> {
    this.deliveries = this.deliveries.filter(
      findDelivery => findDelivery.id !== delivery_id,
    );
  }
}

export default FakeDeliveryRepository;
