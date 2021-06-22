import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IDeliveryInstanceRepository from '@modules/deliveries/repositories/IDeliveryInstanceRepository';
import IDeliveryRepository from '@modules/deliveries/repositories/IDeliveryRepository';

import DeliveryInstance from '../infra/typeorm/entities/DeliveryInstance';

interface IRequest {
  delivery_id: string;
}

@injectable()
class FindDeliveryInstancesByDeliveryService {
  constructor(
    @inject('DeliveryInstanceRepository')
    private deliveryInstanceRepository: IDeliveryInstanceRepository,

    @inject('DeliveryRepository')
    private deliveryRepository: IDeliveryRepository,
  ) {}

  public async execute({ delivery_id }: IRequest): Promise<DeliveryInstance[]> {
    const delivery = await this.deliveryRepository.findById(delivery_id);

    if (!delivery) {
      throw new AppError('Delivery not found', 404);
    }

    const deliveryInstances =
      await this.deliveryInstanceRepository.findByDelivery(delivery_id);

    return deliveryInstances;
  }
}

export default FindDeliveryInstancesByDeliveryService;
