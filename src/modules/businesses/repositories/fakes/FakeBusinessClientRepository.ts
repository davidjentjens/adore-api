import { uuid } from 'uuidv4';

import IBusinessClientDTO from '@modules/businesses/dtos/IBusinessClientDTO';
import IBusinessClientRepository from '../IBusinessClientRepository';

import BusinessClient from '../../infra/typeorm/entities/BusinessClient';

class BusinessClientRepository implements IBusinessClientRepository {
  private businessClients: BusinessClient[] = [];

  public async create(
    businessClientData: IBusinessClientDTO,
  ): Promise<BusinessClient> {
    const businessClient = new BusinessClient();

    Object.assign(businessClient, { id: uuid() }, businessClientData);

    this.businessClients.push(businessClient);

    return businessClient;
  }

  public async findById(
    busines_post_id: string,
  ): Promise<BusinessClient | undefined> {
    const findBusinessClient = this.businessClients.find(
      businessClient => businessClient.id === busines_post_id,
    );

    return findBusinessClient;
  }

  public async findSameTierSubscription(
    data: IBusinessClientDTO,
  ): Promise<BusinessClient | undefined> {
    const findBusinessClient = this.businessClients.find(
      businessClient =>
        businessClient.client_id === data.client_id &&
        businessClient.business_id === data.business_id &&
        businessClient.tier_id === data.tier_id,
    );

    return findBusinessClient;
  }

  public async findSubscription(
    data: IBusinessClientDTO,
  ): Promise<BusinessClient | undefined> {
    const findBusinessClient = this.businessClients.find(
      businessClient =>
        businessClient.client_id === data.client_id &&
        businessClient.business_id === data.business_id,
    );

    return findBusinessClient;
  }

  public async findSubscribed(client_id: string): Promise<BusinessClient[]> {
    const findBusinessClient = this.businessClients.filter(
      businessClient => businessClient.client_id === client_id,
    );

    return findBusinessClient;
  }

  public async save(businessClient: BusinessClient): Promise<BusinessClient> {
    const findIndex = this.businessClients.findIndex(
      findBusinessClient => findBusinessClient.id === businessClient.id,
    );

    this.businessClients[findIndex] = businessClient;

    return businessClient;
  }

  public async delete(business_post_id: string): Promise<void> {
    this.businessClients = this.businessClients.filter(
      findBusinessClient => findBusinessClient.id !== business_post_id,
    );
  }
}

export default BusinessClientRepository;
