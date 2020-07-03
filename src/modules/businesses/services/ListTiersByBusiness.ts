import { inject, injectable } from 'tsyringe';

import Tier from '@modules/businesses/infra/typeorm/entities/Tier';

import ITierRepository from '@modules/businesses/repositories/ITierRepository';

interface IRequest {
  business_id: string;
}

@injectable()
class ListTiersByBusiness {
  constructor(
    @inject('TierRepository')
    private tierRepository: ITierRepository,
  ) {}

  public async execute({ business_id }: IRequest): Promise<Tier[] | undefined> {
    const tiers = await this.tierRepository.findByBusiness(business_id);

    return tiers;
  }
}

export default ListTiersByBusiness;
