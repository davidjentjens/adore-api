import { uuid } from 'uuidv4';

import IBusinessPostDTO from '@modules/businesses/dtos/IBusinessPostDTO';
import IBusinessPostsRepository from '../IBusinessPostsRepository';

import BusinessPost from '../../infra/typeorm/entities/BusinessPost';

class BusinessPostsRepository implements IBusinessPostsRepository {
  private businessPosts: BusinessPost[] = [];

  public async create(
    businessPostData: IBusinessPostDTO,
  ): Promise<BusinessPost> {
    const businessPost = new BusinessPost();

    Object.assign(businessPost, { id: uuid() }, businessPostData);

    this.businessPosts.push(businessPost);

    return businessPost;
  }

  public async find(
    busines_post_id: string,
  ): Promise<BusinessPost | undefined> {
    const findBusinessPost = this.businessPosts.find(
      businessPost => businessPost.id === busines_post_id,
    );

    return findBusinessPost;
  }

  public async findAll(): Promise<BusinessPost[]> {
    return this.businessPosts;
  }

  public async findAllInBusiness(business_id: string): Promise<BusinessPost[]> {
    const findBusinessPosts = this.businessPosts.filter(
      businessPost => businessPost.business_id === business_id,
    );

    return findBusinessPosts;
  }

  public async save(businessPost: BusinessPost): Promise<BusinessPost> {
    const findIndex = this.businessPosts.findIndex(
      findBusinessPost => findBusinessPost.id === businessPost.id,
    );

    this.businessPosts[findIndex] = businessPost;

    return businessPost;
  }

  public async delete(businessPost: BusinessPost): Promise<void> {
    this.businessPosts = this.businessPosts.filter(
      findBusinessPost => findBusinessPost.id !== businessPost.id,
    );
  }
}

export default BusinessPostsRepository;
