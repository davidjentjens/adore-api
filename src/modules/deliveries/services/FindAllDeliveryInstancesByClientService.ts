import { inject, injectable } from 'tsyringe';

import IDeliveryInstanceRepository from '@modules/deliveries/repositories/IDeliveryInstanceRepository';

import DeliveryInstance from '../infra/typeorm/entities/DeliveryInstance';

interface IRequest {
  client_id: string;
}

@injectable()
class FindAllDeliveryInstancesByClientService {
  constructor(
    @inject('DeliveryInstanceRepository')
    private deliveryInstanceRepository: IDeliveryInstanceRepository,
  ) {}

  public async execute({ client_id }: IRequest): Promise<DeliveryInstance[]> {
    const deliveryInstances =
      await this.deliveryInstanceRepository.findByClient(client_id);

    return deliveryInstances;
  }
}

export default FindAllDeliveryInstancesByClientService;
