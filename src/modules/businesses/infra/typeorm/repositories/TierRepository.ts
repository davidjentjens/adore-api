import { getRepository, Repository } from 'typeorm';

import ITierDTO from '@modules/businesses/dtos/ITierDTO';
import ITierRepository from '../../../repositories/ITierRepository';

import Tier from '../entities/Tier';

class TierRepository implements ITierRepository {
  private ormRepository: Repository<Tier>;

  constructor() {
    this.ormRepository = getRepository(Tier);
  }

  public async create({
    business_id,
    name,
    desc,
    rank,
    value,
    image_url,
  }: ITierDTO): Promise<Tier> {
    const tier = await this.ormRepository.create({
      business_id,
      name,
      desc,
      rank,
      value,
      image_url,
    });

    await this.ormRepository.save(tier);

    return tier;
  }

  public async find(tier_id: string): Promise<Tier | undefined> {
    const tier = await this.ormRepository
      .createQueryBuilder('tier')
      .where({ id: tier_id })
      .leftJoinAndSelect('tier.business', 'business')
      .getMany();

    return tier[0] ? tier[0] : undefined;
  }

  public async findByName(name: string): Promise<Tier | undefined> {
    const tier = this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return tier;
  }

  public async findByRank(rank: number): Promise<Tier | undefined> {
    const tier = this.ormRepository.findOne({
      where: {
        rank,
      },
    });

    return tier;
  }

  public async findByBusiness(business_id: string): Promise<Tier[]> {
    const tier = this.ormRepository.find({
      where: {
        business_id,
      },
    });

    return tier;
  }

  public async findAll(): Promise<Tier[]> {
    const findTiers = await this.ormRepository.find();

    return findTiers;
  }

  public async save(tier: Tier): Promise<Tier> {
    return this.ormRepository.save(tier);
  }

  public async delete(tier_id: string): Promise<void> {
    await this.ormRepository.delete({ id: tier_id });
  }
}

export default TierRepository;
