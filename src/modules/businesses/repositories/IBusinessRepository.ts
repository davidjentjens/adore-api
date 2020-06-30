import Business from '../infra/typeorm/entities/Business';

import ICreateBusinessDTO from '../dtos/ICreateBusinessDTO';

export default interface IBusinessRepository {
  create(data: ICreateBusinessDTO): Promise<Business>;
  find(business_id: string): Promise<Business | undefined>;
  findByName(business_name: string): Promise<Business | undefined>;
  findAll(): Promise<Business[]>;
  save(business: Business): Promise<Business>;
  delete(business: Business): Promise<void>;
}
