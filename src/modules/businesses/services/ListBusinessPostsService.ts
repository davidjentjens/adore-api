import { inject, injectable } from 'tsyringe';

import ILikeRepository from '@modules/businesses/repositories/ILikesRepository';
import IBusinessPostsRepository from '@modules/businesses/repositories/IBusinessPostsRepository';

import BusinessPost from '../infra/typeorm/entities/BusinessPost';

interface IBusinessPostWithLikes extends BusinessPost {
  liked: boolean;
}

interface IRequest {
  client_id: string;
}

@injectable()
class ListBusinessPostsService {
  constructor(
    @inject('LikesRepository')
    private likeRepository: ILikeRepository,

    @inject('BusinessPostsRepository')
    private businessPostsRepository: IBusinessPostsRepository,
  ) {}

  public async execute({
    client_id,
  }: IRequest): Promise<IBusinessPostWithLikes[]> {
    const findBusinessPosts = await this.businessPostsRepository.findAll();

    const likes = await this.likeRepository.findAllByUser(client_id);

    const likedPostIds = likes.map(like => like.business_post_id);

    const businessPostsWithLikes = new Array<IBusinessPostWithLikes>();

    findBusinessPosts.forEach(businessPost => {
      if (likedPostIds.includes(businessPost.id)) {
        businessPostsWithLikes.push({ ...businessPost, liked: true });
      } else {
        businessPostsWithLikes.push({ ...businessPost, liked: false });
      }
    });

    return businessPostsWithLikes;
  }
}

export default ListBusinessPostsService;
