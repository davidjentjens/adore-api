import BusinessClient from '../infra/typeorm/entities/BusinessClient';

import IBusinessClientDTO from '../dtos/IBusinessClientDTO';

export default interface IBusinessClientRepository {
  create(data: IBusinessClientDTO): Promise<BusinessClient>;
  findById(id: string): Promise<BusinessClient | undefined>;
  findSameTierSubscription(
    data: IBusinessClientDTO,
  ): Promise<BusinessClient | undefined>;
  findSubscription(
    data: IBusinessClientDTO,
  ): Promise<BusinessClient | undefined>;
  findSubscribed(client_id: string): Promise<BusinessClient[]>;
  save(businessClient: BusinessClient): Promise<BusinessClient>;
  delete(business_client_id: string): Promise<void>;
}
