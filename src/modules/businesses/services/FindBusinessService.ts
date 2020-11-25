import { inject, injectable } from 'tsyringe';

import Business from '@modules/businesses/infra/typeorm/entities/Business';
import IBusinessRepository from '@modules/businesses/repositories/IBusinessRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  business_id: string;
}

@injectable()
class FindBusinessService {
  constructor(
    @inject('BusinessRepository')
    private businessRepository: IBusinessRepository,
  ) {}

  public async execute({
    business_id,
  }: IRequest): Promise<Business | undefined> {
    const business = await this.businessRepository.findById(business_id);

    if (!business) {
      throw new AppError('Business not found', 404);
    }

    return business;
  }
}

export default FindBusinessService;
