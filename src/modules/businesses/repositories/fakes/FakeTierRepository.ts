import { uuid } from 'uuidv4';

import ITierDTO from '@modules/businesses/dtos/ITierDTO';
import ITierRepository from '../ITierRepository';

import Tier from '../../infra/typeorm/entities/Tier';

class TierRepository implements ITierRepository {
  private tiers: Tier[] = [];

  public async create(tierData: ITierDTO): Promise<Tier> {
    const tier = new Tier();

    Object.assign(tier, { id: uuid() }, tierData);

    this.tiers.push(tier);

    return tier;
  }

  public async find(tier_id: string): Promise<Tier | undefined> {
    const findTier = this.tiers.find(tier => tier.id === tier_id);

    return findTier;
  }

  public async findByName(name: string): Promise<Tier | undefined> {
    const findTier = this.tiers.find(tier => tier.name === name);

    return findTier;
  }

  public async findByRank(rank: number): Promise<Tier | undefined> {
    const findTier = this.tiers.find(tier => tier.rank === rank);

    return findTier;
  }

  public async findByBusiness(business_id: string): Promise<Tier[]> {
    const findTier = this.tiers.filter(
      tier => tier.business_id === business_id,
    );

    return findTier;
  }

  public async findAll(): Promise<Tier[]> {
    return this.tiers;
  }

  public async save(tier: Tier): Promise<Tier> {
    const findIndex = this.tiers.findIndex(findTier => findTier.id === tier.id);

    this.tiers[findIndex] = tier;

    return tier;
  }

  public async delete(tier_id: string): Promise<void> {
    this.tiers = this.tiers.filter(findTier => findTier.id !== tier_id);
  }
}

export default TierRepository;
