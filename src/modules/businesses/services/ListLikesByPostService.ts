import { inject, injectable } from 'tsyringe';

import Like from '@modules/businesses/infra/typeorm/entities/Like';

import ILikeRepository from '@modules/businesses/repositories/ILikesRepository';
import IBusinessPostsRepository from '@modules/businesses/repositories/IBusinessPostsRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  business_post_id: string;
}

@injectable()
class ListLikesByPostService {
  constructor(
    @inject('BusinessPostsRepository')
    private businessPostsRepository: IBusinessPostsRepository,

    @inject('LikesRepository')
    private likeRepository: ILikeRepository,
  ) {}

  public async execute({ business_post_id }: IRequest): Promise<Like[]> {
    const findPost = await this.businessPostsRepository.find(business_post_id);

    if (!findPost) {
      throw new AppError('Post not found', 404);
    }

    const likes = await this.likeRepository.findAllInPost(business_post_id);

    return likes;
  }
}

export default ListLikesByPostService;
