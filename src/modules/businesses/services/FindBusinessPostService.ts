import { inject, injectable } from 'tsyringe';

import IBusinessPostsRepository from '@modules/businesses/repositories/IBusinessPostsRepository';

import AppError from '@shared/errors/AppError';
import BusinessPost from '../infra/typeorm/entities/BusinessPost';

interface IRequest {
  business_post_id: string;
}

@injectable()
class FindBusinessPostService {
  constructor(
    @inject('BusinessPostsRepository')
    private businessPostsRepository: IBusinessPostsRepository,
  ) {}

  public async execute({ business_post_id }: IRequest): Promise<BusinessPost> {
    const findBusinessPost = await this.businessPostsRepository.find(
      business_post_id,
    );

    if (!findBusinessPost) {
      throw new AppError('Post not found', 404);
    }

    return findBusinessPost;
  }
}

export default FindBusinessPostService;
