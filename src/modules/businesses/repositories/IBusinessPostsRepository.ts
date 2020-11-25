import BusinessPost from '../infra/typeorm/entities/BusinessPost';

import IBusinessPostDTO from '../dtos/IBusinessPostDTO';

export default interface IBusinessPostsRepository {
  create(data: IBusinessPostDTO): Promise<BusinessPost>;
  findById(business_post_id: string): Promise<BusinessPost | undefined>;
  findAll(): Promise<BusinessPost[]>;
  findAllInBusiness(business_id: string): Promise<BusinessPost[]>;
  save(businessPost: BusinessPost): Promise<BusinessPost>;
  delete(business_post_id: string): Promise<void>;
}
