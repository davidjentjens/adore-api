import { inject, injectable } from 'tsyringe';

import Tier from '@modules/businesses/infra/typeorm/entities/Tier';

import IBusinessRepository from '@modules/businesses/repositories/IBusinessRepository';
import ITierRepository from '@modules/businesses/repositories/ITierRepository';

import AppError from '@shared/errors/AppError';

interface IRequest {
  business_id: string;
}

@injectable()
class ListTiersByBusiness {
  constructor(
    @inject('BusinessRepository')
    private businessRepository: IBusinessRepository,

    @inject('TierRepository')
    private tierRepository: ITierRepository,
  ) {}

  public async execute({ business_id }: IRequest): Promise<Tier[] | undefined> {
    const findBusiness = await this.businessRepository.find(business_id);

    if (!findBusiness) {
      throw new AppError('Business does not exist', 404);
    }

    const tiers = await this.tierRepository.findByBusiness(business_id);

    return tiers;
  }
}

export default ListTiersByBusiness;
