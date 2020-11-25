import { inject, injectable } from 'tsyringe';

import ILikeRepository from '@modules/businesses/repositories/ILikesRepository';
import IBusinessPostsRepository from '@modules/businesses/repositories/IBusinessPostsRepository';

import AppError from '@shared/errors/AppError';
import BusinessPost from '../infra/typeorm/entities/BusinessPost';

interface IBusinessPostWithLikes extends BusinessPost {
  liked: boolean;
}

interface IRequest {
  client_id: string;
  business_post_id: string;
}

@injectable()
class FindBusinessPostService {
  constructor(
    @inject('LikesRepository')
    private likeRepository: ILikeRepository,

    @inject('BusinessPostsRepository')
    private businessPostsRepository: IBusinessPostsRepository,
  ) {}

  public async execute({
    client_id,
    business_post_id,
  }: IRequest): Promise<IBusinessPostWithLikes> {
    const findBusinessPost = await this.businessPostsRepository.findById(
      business_post_id,
    );

    if (!findBusinessPost) {
      throw new AppError('Post not found', 404);
    }

    const likes = await this.likeRepository.findAllByUser(client_id);

    const likedPostIds = likes.map(like => like.business_post_id);

    if (likedPostIds.includes(findBusinessPost.id)) {
      return { ...findBusinessPost, liked: true };
    }

    return { ...findBusinessPost, liked: false };
  }
}

export default FindBusinessPostService;
