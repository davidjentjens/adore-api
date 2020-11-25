import { uuid } from 'uuidv4';

import ILikeDTO from '@modules/businesses/dtos/ILikeDTO';
import ILikesRepository from '../ILikesRepository';

import Like from '../../infra/typeorm/entities/Like';

class LikesRepository implements ILikesRepository {
  private likes: Like[] = [];

  public async create(likeData: ILikeDTO): Promise<Like> {
    const like = new Like();

    Object.assign(like, { id: uuid() }, likeData);

    this.likes.push(like);

    return like;
  }

  public async findById(like_id: string): Promise<Like | undefined> {
    const findLike = this.likes.find(like => like.id === like_id);

    return findLike;
  }

  public async findByClientPost({
    business_post_id,
    client_id,
  }: ILikeDTO): Promise<Like | undefined> {
    const findLike = this.likes.find(
      like =>
        like.business_post_id === business_post_id &&
        like.client_id === client_id,
    );

    return findLike;
  }

  public async findAllByUser(client_id: string): Promise<Like[]> {
    const findLikes = this.likes.filter(like => like.client_id === client_id);

    return findLikes;
  }

  public async findAllInPost(business_post_id: string): Promise<Like[]> {
    const findLikes = this.likes.filter(
      like => like.business_post_id === business_post_id,
    );

    return findLikes;
  }

  public async save(like: Like): Promise<Like> {
    const findIndex = this.likes.findIndex(findLike => findLike.id === like.id);

    this.likes[findIndex] = like;

    return like;
  }

  public async delete(business_post_id: string): Promise<void> {
    this.likes = this.likes.filter(
      findLike => findLike.id !== business_post_id,
    );
  }
}

export default LikesRepository;
