import BusinessClient from '../infra/typeorm/entities/BusinessClient';

import IBusinessClientDTO from '../dtos/IBusinessClientDTO';

interface ISubscription {
  business_id: string;
  client_id: string;
}

export default interface IBusinessClientRepository {
  create(data: IBusinessClientDTO): Promise<BusinessClient>;
  findById(id: string): Promise<BusinessClient | undefined>;
  findSameTierSubscription(
    data: IBusinessClientDTO,
  ): Promise<BusinessClient | undefined>;
  findSubscription(data: ISubscription): Promise<BusinessClient | undefined>;
  findSubscribed(client_id: string): Promise<BusinessClient[]>;
  save(businessClient: BusinessClient): Promise<BusinessClient>;
  delete(id: string): Promise<void>;
}
