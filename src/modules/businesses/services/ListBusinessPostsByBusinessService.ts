import { inject, injectable } from 'tsyringe';

import IBusinessRepository from '@modules/businesses/repositories/IBusinessRepository';
import IBusinessPostsRepository from '@modules/businesses/repositories/IBusinessPostsRepository';

import AppError from '@shared/errors/AppError';
import BusinessPost from '../infra/typeorm/entities/BusinessPost';

interface IRequest {
  business_id: string;
}

@injectable()
class ListBusinessPostsByBusinessService {
  constructor(
    @inject('BusinessRepository')
    private businessRepository: IBusinessRepository,

    @inject('BusinessPostsRepository')
    private businessPostsRepository: IBusinessPostsRepository,
  ) {}

  public async execute({ business_id }: IRequest): Promise<BusinessPost[]> {
    const findBusiness = await this.businessRepository.findById(business_id);

    if (!findBusiness) {
      throw new AppError('Business does not exist');
    }

    const findBusinessPost = await this.businessPostsRepository.findAllInBusiness(
      business_id,
    );

    return findBusinessPost;
  }
}

export default ListBusinessPostsByBusinessService;
