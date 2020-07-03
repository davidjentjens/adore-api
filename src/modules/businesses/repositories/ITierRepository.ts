import Tier from '../infra/typeorm/entities/Tier';

import ITierDTO from '../dtos/ITierDTO';

export default interface ITierRepository {
  create(data: ITierDTO): Promise<Tier>;
  find(tier_id: string): Promise<Tier | undefined>;
  findByName(name: string): Promise<Tier | undefined>;
  findByRank(rank: number): Promise<Tier | undefined>;
  findByBusiness(business_id: string): Promise<Tier[]>;
  findAll(): Promise<Tier[]>;
  save(tier: Tier): Promise<Tier>;
  delete(tier: Tier): Promise<void>;
}
