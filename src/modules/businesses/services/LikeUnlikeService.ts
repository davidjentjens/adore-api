import { inject, injectable } from 'tsyringe';

import Like from '@modules/businesses/infra/typeorm/entities/Like';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ILikeRepository from '@modules/businesses/repositories/ILikesRepository';
import IBusinessPostsRepository from '@modules/businesses/repositories/IBusinessPostsRepository';

import IRequest from '@modules/businesses/dtos/ILikeDTO';
import AppError from '@shared/errors/AppError';

@injectable()
class LikeUnlikeService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('BusinessPostsRepository')
    private businessPostsRepository: IBusinessPostsRepository,

    @inject('LikesRepository')
    private likeRepository: ILikeRepository,
  ) {}

  public async execute({
    business_post_id,
    client_id,
  }: IRequest): Promise<Like | undefined> {
    const findUser = await this.usersRepository.findById(client_id);

    if (!findUser) {
      throw new AppError('User does not exist');
    }

    const findPost = await this.businessPostsRepository.findById(
      business_post_id,
    );

    if (!findPost) {
      throw new AppError('Post not found', 404);
    }

    const liked = await this.likeRepository.findByClientPost({
      business_post_id,
      client_id,
    });

    if (liked) {
      await this.likeRepository.delete(liked.id);
      return undefined;
    }

    const like = await this.likeRepository.create({
      business_post_id,
      client_id,
    });

    return like;
  }
}

export default LikeUnlikeService;
