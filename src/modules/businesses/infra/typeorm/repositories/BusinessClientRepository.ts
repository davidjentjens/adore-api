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
    business_id,
    client_id,
    tier_id,
  }: IBusinessClientDTO): Promise<BusinessClient> {
    const businessClient = await this.ormRepository.create({
      business_id,
      client_id,
      tier_id,
    });

    await this.ormRepository.save(businessClient);

    return businessClient;
  }

  public async findById(id: string): Promise<BusinessClient | undefined> {
    return this.ormRepository.findOne({ where: { id } });
  }

  public async findSameTierSubscription({
    business_id,
    client_id,
    tier_id,
  }: IBusinessClientDTO): Promise<BusinessClient | undefined> {
    return this.ormRepository.findOne({
      where: {
        business_id,
        client_id,
        tier_id,
      },
    });
  }

  public async findSubscription({
    business_id,
    client_id,
  }: IBusinessClientDTO): Promise<BusinessClient | undefined> {
    const findSubscription = await this.ormRepository
      .createQueryBuilder('business_client')
      .where({
        business_id,
        client_id,
      })
      .leftJoinAndSelect('business_client.business', 'business')
      .leftJoinAndSelect('business_client.tier', 'tier')
      .getMany();

    return findSubscription[0] ? findSubscription[0] : undefined;
  }

  public async findSubscribed(client_id: string): Promise<BusinessClient[]> {
    return this.ormRepository
      .createQueryBuilder('business_client')
      .where({
        client_id,
      })
      .leftJoinAndSelect('business_client.business', 'business')
      .leftJoinAndSelect('business_client.tier', 'tier')
      .getMany();
  }

  public async save(businessClient: BusinessClient): Promise<BusinessClient> {
    return this.ormRepository.save(businessClient);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete({ id });
  }
}

export default BusinessClientRepository;
