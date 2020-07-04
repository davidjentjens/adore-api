import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Tier from '@modules/businesses/infra/typeorm/entities/Tier';

import ITierRepository from '@modules/businesses/repositories/ITierRepository';

interface IRequest {
  tier_id: string;
}

@injectable()
class FindTierService {
  constructor(
    @inject('TierRepository')
    private tierRepository: ITierRepository,
  ) {}

  public async execute({ tier_id }: IRequest): Promise<Tier> {
    const tier = await this.tierRepository.find(tier_id);

    if (!tier) {
      throw new AppError('Tier not found', 404);
    }

    return tier;
  }
}

export default FindTierService;
