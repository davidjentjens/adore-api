import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Tier from '@modules/businesses/infra/typeorm/entities/Tier';
import ITierRepository from '@modules/businesses/repositories/ITierRepository';

import IRequest from '@modules/businesses/dtos/ITierDTO';

@injectable()
class CreateTierService {
  constructor(
    @inject('TierRepository')
    private tierRepository: ITierRepository,
  ) {}

  // TODO: Fix ranking logic
  public async execute({
    rank,
    business_id,
    name,
    desc,
    value,
  }: IRequest): Promise<Tier> {
    const findTierWithSameName = await this.tierRepository.findByName(name);

    if (findTierWithSameName) {
      throw new AppError('A tier by this name already exists');
    }

    /* if (rank) {
      const findTierWithSameRank = await this.tierRepository.findByRank(rank);

      if (findTierWithSameRank) {
        throw new AppError('A tier with this rank already exists');
      }

      const tier = await this.tierRepository.create({
        business_id,
        name,
        value,
        rank,
      });

      return tier;
    } */

    const tier = await this.tierRepository.create({
      business_id,
      name,
      desc,
      value,
      rank,
    });

    return tier;
  }
}

export default CreateTierService;
