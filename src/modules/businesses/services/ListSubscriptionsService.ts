import { inject, injectable } from 'tsyringe';

import BusinessClient from '@modules/businesses/infra/typeorm/entities/BusinessClient';
import IBusinessClientRepository from '@modules/businesses/repositories/IBusinessClientRepository';

interface IRequest {
  client_id: string;
}

@injectable()
class SubscribeToBusinessService {
  constructor(
    @inject('BusinessClientRepository')
    private businessClientRepository: IBusinessClientRepository,
  ) {}

  public async execute({ client_id }: IRequest): Promise<BusinessClient[]> {
    const subscriptions = await this.businessClientRepository.findSubscribed(
      client_id,
    );

    return subscriptions;
  }
}

export default SubscribeToBusinessService;
