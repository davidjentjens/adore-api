import { getRepository, Repository } from 'typeorm';

import IBusinessPostDTO from '@modules/businesses/dtos/IBusinessPostDTO';
import IBusinessPostsRepository from '../../../repositories/IBusinessPostsRepository';

import BusinessPost from '../entities/BusinessPost';

class BusinessPostRepository implements IBusinessPostsRepository {
  private ormRepository: Repository<BusinessPost>;

  constructor() {
    this.ormRepository = getRepository(BusinessPost);
  }

  public async create({
    title,
    desc,
    short_desc,
    business_id,
    image_url,
  }: IBusinessPostDTO): Promise<BusinessPost> {
    const businessPost = this.ormRepository.create({
      title,
      desc,
      short_desc,
      business_id,
      image_url,
    });

    await this.ormRepository.save(businessPost);

    return businessPost;
  }

  public async find(
    business_post_id: string,
  ): Promise<BusinessPost | undefined> {
    const findBusinessPost = await this.ormRepository
      .createQueryBuilder('business_post')
      .where({ id: business_post_id })
      .leftJoinAndSelect('business_post.business', 'business')
      .getMany();

    return findBusinessPost[0] ? findBusinessPost[0] : undefined;
  }

  public async findAll(): Promise<BusinessPost[]> {
    const findBusinessPosts = await this.ormRepository
      .createQueryBuilder('business_post')
      .leftJoinAndSelect('business_post.business', 'business')
      .getMany();

    return findBusinessPosts;
  }

  public async findAllInBusiness(business_id: string): Promise<BusinessPost[]> {
    const findBusinessPosts = await this.ormRepository
      .createQueryBuilder('business_post')
      .where({ business_id })
      .leftJoinAndSelect('business_post.business', 'business')
      .getMany();

    return findBusinessPosts;
  }

  public async save(businessPost: BusinessPost): Promise<BusinessPost> {
    return this.ormRepository.save(businessPost);
  }

  public async delete(businessPost: BusinessPost): Promise<void> {
    await this.ormRepository.remove(businessPost);
  }
}

export default BusinessPostRepository;
