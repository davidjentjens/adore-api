import { getRepository, Repository } from 'typeorm';

import IPerksRepository from '@modules/businesses/repositories/IPerksRepository';

import IPerkDTO from '@modules/businesses/dtos/IPerkDTO';

import Perk from '../entities/Perk';

class PerksRepository implements IPerksRepository {
  private ormRepository: Repository<Perk>;

  constructor() {
    this.ormRepository = getRepository(Perk);
  }

  public async create({
    title,
    desc,
    image_url,
    tier_id,
  }: IPerkDTO): Promise<Perk> {
    const perk = await this.ormRepository.create({
      title,
      desc,
      image_url,
      tier_id,
    });

    await this.ormRepository.save(perk);

    return perk;
  }

  public async findById(perk_id: string): Promise<Perk | undefined> {
    return this.ormRepository.findOne({ where: { id: perk_id } });
  }

  public async findByTier(tier_id: string): Promise<Perk[]> {
    return this.ormRepository.find({
      where: {
        tier_id,
      },
    });
  }

  public async save(perk: Perk): Promise<Perk> {
    return this.ormRepository.save(perk);
  }

  public async delete(perk_id: string): Promise<void> {
    await this.ormRepository.delete({ id: perk_id });
  }
}

export default PerksRepository;
