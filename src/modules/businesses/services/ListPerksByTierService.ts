import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Perk from '@modules/businesses/infra/typeorm/entities/Perk';
import ITierRepository from '@modules/businesses/repositories/ITierRepository';
import IPerksRepository from '@modules/businesses/repositories/IPerksRepository';

interface IRequest {
  tier_id: string;
}

@injectable()
class ListPerksByTierService {
  constructor(
    @inject('TierRepository')
    private tierRepository: ITierRepository,

    @inject('PerksRepository')
    private perksRepository: IPerksRepository,
  ) {}

  public async execute({ tier_id }: IRequest): Promise<Perk[]> {
    const findTier = await this.tierRepository.findById(tier_id);

    if (!findTier) {
      throw new AppError('Tier does not exist');
    }

    const perks = await this.perksRepository.findByTier(tier_id);

    return perks;
  }
}

export default ListPerksByTierService;
