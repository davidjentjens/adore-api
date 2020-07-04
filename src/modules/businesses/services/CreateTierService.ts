import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Tier from '@modules/businesses/infra/typeorm/entities/Tier';

import IBusinessRepository from '@modules/businesses/repositories/IBusinessRepository';
import ITierRepository from '@modules/businesses/repositories/ITierRepository';

import IRequest from '@modules/businesses/dtos/ITierDTO';

@injectable()
class CreateTierService {
  constructor(
    @inject('BusinessRepository')
    private businessRepository: IBusinessRepository,

    @inject('TierRepository')
    private tierRepository: ITierRepository,
  ) {}

  // TODO: Fix ranking logic
  public async execute({
    owner_id,
    rank,
    business_id,
    name,
    desc,
    value,
    image_url,
  }: IRequest): Promise<Tier> {
    const findBusiness = await this.businessRepository.find(business_id);

    if (!findBusiness) {
      throw new AppError('Business does not exist', 404);
    }

    if (findBusiness.owner_id !== owner_id) {
      throw new AppError(
        'Only the owner of the business can create tiers for their service',
      );
    }

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
      owner_id,
      business_id,
      name,
      desc,
      value,
      rank,
      image_url,
    });

    return tier;
  }
}

export default CreateTierService;
