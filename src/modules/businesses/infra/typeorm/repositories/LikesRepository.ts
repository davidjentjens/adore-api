import { getRepository, Repository } from 'typeorm';

import ILikeDTO from '@modules/businesses/dtos/ILikeDTO';
import ILikeRepository from '../../../repositories/ILikesRepository';

import Like from '../entities/Like';

class LikesRepository implements ILikeRepository {
  private ormRepository: Repository<Like>;

  constructor() {
    this.ormRepository = getRepository(Like);
  }

  public async create({
    business_post_id,
    client_id,
  }: ILikeDTO): Promise<Like> {
    const like = this.ormRepository.create({
      business_post_id,
      client_id,
    });

    await this.ormRepository.save(like);

    return like;
  }

  public async find(like_id: string): Promise<Like | undefined> {
    const findLike = await this.ormRepository.findOne({
      where: { id: like_id },
    });

    return findLike;
  }

  public async findByClientPost({
    business_post_id,
    client_id,
  }: ILikeDTO): Promise<Like | undefined> {
    const findLike = await this.ormRepository.findOne({
      where: { business_post_id, client_id },
    });

    return findLike;
  }

  public async findAllByUser(client_id: string): Promise<Like[]> {
    const findLikes = await this.ormRepository.find({
      where: { client_id },
    });

    return findLikes;
  }

  public async findAllInPost(business_post_id: string): Promise<Like[]> {
    const findLikes = await this.ormRepository.find({
      where: { business_post_id },
    });

    return findLikes;
  }

  public async save(like: Like): Promise<Like> {
    return this.ormRepository.save(like);
  }

  public async delete(like_id: string): Promise<void> {
    await this.ormRepository.delete({ id: like_id });
  }
}

export default LikesRepository;
