import IDeliveryRepository from '@modules/deliveries/repositories/IDeliveryRepository';
import { Repository, getRepository } from 'typeorm';
import IDeliveryDTO from '@modules/deliveries/dtos/IDeliveryDTO';
import Delivery from '../entities/Delivery';

class DeliveryRepository implements IDeliveryRepository {
  private ormRepository: Repository<Delivery>;

  constructor() {
    this.ormRepository = getRepository(Delivery);
  }

  public async create({ date, perk_id }: IDeliveryDTO): Promise<Delivery> {
    const delivery = this.ormRepository.create({
      date,
      perk_id,
    });

    await this.ormRepository.save(delivery);

    return delivery;
  }

  public async findById(delivery_id: string): Promise<Delivery | undefined> {
    const findDelivery = await this.ormRepository
      .createQueryBuilder('delivery')
      .where({
        id: delivery_id,
      })
      .leftJoinAndSelect('delivery.perk', 'perk')
      .leftJoinAndSelect('perk.tier', 'tier')
      .leftJoinAndSelect('tier.business', 'business')
      .getOne();

    return findDelivery;
  }

  public async findByPerk(perk_id: string): Promise<Delivery[]> {
    const findDeliveries = await this.ormRepository
      .createQueryBuilder('delivery')
      .where({
        perk_id,
      })
      .leftJoinAndSelect('delivery.perk', 'perk')
      .getMany();

    return findDeliveries;
  }

  public async save(delivery: Delivery): Promise<Delivery> {
    return this.ormRepository.save(delivery);
  }

  public async delete(delivery_id: string): Promise<void> {
    await this.ormRepository.delete({ id: delivery_id });
  }
}

export default DeliveryRepository;
