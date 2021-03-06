import Like from '../infra/typeorm/entities/Like';

import ILikeDTO from '../dtos/ILikeDTO';

export default interface ILikesRepository {
  create(data: ILikeDTO): Promise<Like>;
  findById(like_id: string): Promise<Like | undefined>;
  findByClientPost(data: ILikeDTO): Promise<Like | undefined>;
  findAllByUser(client_id: string): Promise<Like[]>;
  findAllInPost(business_post_id: string): Promise<Like[]>;
  save(like: Like): Promise<Like>;
  delete(like_id: string): Promise<void>;
}
