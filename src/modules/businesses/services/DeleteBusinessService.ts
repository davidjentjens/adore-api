import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IBusinessRepository from '@modules/businesses/repositories/IBusinessRepository';

interface IRequest {
  owner_id: string;
  business_id: string;
}

@injectable()
class DeleteBusinessService {
  constructor(
    @inject('BusinessRepository')
    private businessRepository: IBusinessRepository,
  ) {}

  public async execute({ owner_id, business_id }: IRequest): Promise<void> {
    const findBusiness = await this.businessRepository.find(business_id);

    if (!findBusiness) {
      throw new AppError('Business does not exist', 404);
    }

    if (findBusiness.owner_id !== owner_id) {
      throw new AppError('You are not the owner of this business', 403);
    }

    await this.businessRepository.delete(findBusiness);
  }
}

export default DeleteBusinessService;
