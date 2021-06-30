import { getRepository, Repository } from 'typeorm';

import IBusinessClientRepository from '@modules/businesses/repositories/IBusinessClientRepository';

import IBusinessClientDTO from '@modules/businesses/dtos/IBusinessClientDTO';

import BusinessClient from '../entities/BusinessClient';

class BusinessClientRepository implements IBusinessClientRepository {
  private ormRepository: Repository<BusinessClient>;

  constructor() {
    this.ormRepository = getRepository(BusinessClient);
  }

  public async create({
    client_id,
    tier_id,
  }: IBusinessClientDTO): Promise<BusinessClient> {
    const businessClient = this.ormRepository.create({
      client_id,
      tier_id,
    });

    await this.ormRepository.save(businessClient);

    return businessClient;
  }

  public async findById(id: string): Promise<BusinessClient | undefined> {
    return this.ormRepository.findOne({ where: { id } });
  }

  public async findSubscription({
    client_id,
    tier_id,
  }: IBusinessClientDTO): Promise<BusinessClient | undefined> {
    return this.ormRepository.findOne({
      where: {
        client_id,
        tier_id,
      },
    });
  }

  public async findSubscribed(client_id: string): Promise<BusinessClient[]> {
    return this.ormRepository
      .createQueryBuilder('business_client')
      .where({
        client_id,
      })
      .leftJoinAndSelect('business_client.tier', 'tier')
      .leftJoinAndSelect('tier.business', 'business')
      .getMany();
  }

  public async save(businessClient: BusinessClient): Promise<BusinessClient> {
    return this.ormRepository.save(businessClient);
  }

  public async delete(business_client_id: string): Promise<void> {
    await this.ormRepository.delete({ id: business_client_id });
  }
}

export default BusinessClientRepository;
