import Perk from '../infra/typeorm/entities/Perk';

import IPerkDTO from '../dtos/IPerkDTO';

export default interface IPerksRepositoryIBusinessClientRepository {
  create(data: IPerkDTO): Promise<Perk>;
  find(perk_id: string): Promise<Perk | undefined>;
  findByTier(tier_id: string): Promise<Perk[]>;
  save(perk: Perk): Promise<Perk>;
  delete(perk_id: string): Promise<void>;
}
