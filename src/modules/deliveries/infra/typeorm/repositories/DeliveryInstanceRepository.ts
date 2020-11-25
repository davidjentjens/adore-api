import IDeliveryInstanceRepository from '@modules/deliveries/repositories/IDeliveryInstanceRepository';
import { Repository, getRepository } from 'typeorm';
import IDeliveryInstanceDTO from '@modules/deliveries/dtos/IDeliveryInstanceDTO';
import DeliveryInstance from '../entities/DeliveryInstance';

class DeliveryInstanceInstanceRepository
  implements IDeliveryInstanceRepository {
  private ormRepository: Repository<DeliveryInstance>;

  constructor() {
    this.ormRepository = getRepository(DeliveryInstance);
  }

  public async create({
    delivery_id,
    client_id,
    status,
  }: IDeliveryInstanceDTO): Promise<DeliveryInstance> {
    const deliveryInstance = this.ormRepository.create({
      delivery_id,
      client_id,
      status,
    });

    await this.ormRepository.save(deliveryInstance);

    return deliveryInstance;
  }

  public async findById(
    delivery_instance_id: string,
  ): Promise<DeliveryInstance | undefined> {
    const findDeliveryInstance = await this.ormRepository
      .createQueryBuilder('delivery_instance')
      .where({
        id: delivery_instance_id,
      })
      .leftJoinAndSelect('delivery_instance.delivery', 'delivery')
      .leftJoinAndSelect('delivery.perk', 'perk')
      .leftJoinAndSelect('perk.tier', 'tier')
      .leftJoinAndSelect('tier.business', 'business')
      .getOne();

    return findDeliveryInstance;
  }

  public async findByDelivery(
    delivery_id: string,
  ): Promise<DeliveryInstance[]> {
    const findDeliveryInstances = await this.ormRepository
      .createQueryBuilder('delivery_instance')
      .where({
        delivery_id,
      })
      .leftJoinAndSelect('delivery_instance.delivery', 'delivery')
      .leftJoinAndSelect('delivery_instance.client', 'users')
      .getMany();

    return findDeliveryInstances;
  }

  public async findByClient(client_id: string): Promise<DeliveryInstance[]> {
    const findDeliveryInstances = await this.ormRepository
      .createQueryBuilder('delivery_instance')
      .where({
        client_id,
      })
      .getMany();

    return findDeliveryInstances;
  }

  public async save(
    deliveryInstance: DeliveryInstance,
  ): Promise<DeliveryInstance> {
    return this.ormRepository.save(deliveryInstance);
  }

  public async delete(delivery_instance_id: string): Promise<void> {
    await this.ormRepository.delete({ id: delivery_instance_id });
  }
}

export default DeliveryInstanceInstanceRepository;
