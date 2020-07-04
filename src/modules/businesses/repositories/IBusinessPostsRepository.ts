import BusinessPost from '../infra/typeorm/entities/BusinessPost';

import IBusinessPostDTO from '../dtos/IBusinessPostDTO';

export default interface IBusinessClientRepository {
  create(data: IBusinessPostDTO): Promise<BusinessPost>;
  find(business_post_id: string): Promise<BusinessPost | undefined>;
  findAll(business_id: string): Promise<BusinessPost[]>;
  save(businessPost: BusinessPost): Promise<BusinessPost>;
  delete(businessPost: BusinessPost): Promise<void>;
}
