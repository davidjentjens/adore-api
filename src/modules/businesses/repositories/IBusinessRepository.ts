import Business from '../infra/typeorm/entities/Business';

import IBusinessDTO from '../dtos/IBusinessDTO';

export default interface IBusinessRepository {
  create(data: IBusinessDTO): Promise<Business>;
  find(business_id: string): Promise<Business | undefined>;
  findByName(business_name: string): Promise<Business | undefined>;
  findAll(): Promise<Business[]>;
  findByType(category_id: string): Promise<Business[]>;
  findAllFeatured(): Promise<Business[]>;
  save(business: Business): Promise<Business>;
  delete(business_id: string): Promise<void>;
}
