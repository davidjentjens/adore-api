import { uuid } from 'uuidv4';

import IPerkDTO from '@modules/businesses/dtos/IPerkDTO';
import IPerksRepository from '../IPerksRepository';

import Perk from '../../infra/typeorm/entities/Perk';

class PerksRepository implements IPerksRepository {
  private perks: Perk[] = [];

  public async create(perkData: IPerkDTO): Promise<Perk> {
    const perk = new Perk();

    Object.assign(perk, { id: uuid() }, perkData);

    this.perks.push(perk);

    return perk;
  }

  public async find(perk_id: string): Promise<Perk | undefined> {
    const findPerk = this.perks.find(perk => perk.id === perk_id);

    return findPerk;
  }

  public async findByTier(tier_id: string): Promise<Perk[]> {
    const findPerk = this.perks.filter(perk => perk.tier_id === tier_id);

    return findPerk;
  }

  public async save(perk: Perk): Promise<Perk> {
    const findIndex = this.perks.findIndex(findPerk => findPerk.id === perk.id);

    this.perks[findIndex] = perk;

    return perk;
  }

  public async delete(perk_id: string): Promise<void> {
    this.perks = this.perks.filter(findPerk => findPerk.id !== perk_id);
  }
}

export default PerksRepository;
