import { inject, injectable } from 'tsyringe';

import IBusinessRepository from '@modules/businesses/repositories/IBusinessRepository';
import IBusinessPostsRepository from '@modules/businesses/repositories/IBusinessPostsRepository';

import IRequest from '@modules/businesses/dtos/IBusinessPostDTO';
import AppError from '@shared/errors/AppError';
import BusinessPost from '../infra/typeorm/entities/BusinessPost';

@injectable()
class CreateBusinessPostService {
  constructor(
    @inject('BusinessRepository')
    private businessRepository: IBusinessRepository,

    @inject('BusinessPostsRepository')
    private businessPostsRepository: IBusinessPostsRepository,
  ) {}

  public async execute({
    owner_id,
    title,
    short_desc,
    desc,
    business_id,
    image_url,
  }: IRequest): Promise<BusinessPost> {
    const findBusiness = await this.businessRepository.find(business_id);

    if (!findBusiness) {
      throw new AppError('Business does not exist', 404);
    }

    if (findBusiness.owner_id !== owner_id) {
      throw new AppError(
        'Only the owner of the business can create posts on their page',
      );
    }

    const businessPost = await this.businessPostsRepository.create({
      owner_id,
      title,
      short_desc,
      desc,
      business_id,
      image_url,
    });

    return businessPost;
  }
}

export default CreateBusinessPostService;
