import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IDeliveryInstanceRepository from '@modules/deliveries/repositories/IDeliveryInstanceRepository';
import IDeliveryRepository from '@modules/deliveries/repositories/IDeliveryRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

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

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ delivery_id }: IRequest): Promise<DeliveryInstance[]> {
    const delivery = await this.deliveryRepository.findById(delivery_id);

    if (!delivery) {
      throw new AppError('Delivery not found', 404);
    }

    const deliveryInstances = await this.deliveryInstanceRepository.findByDelivery(
      delivery_id,
    );

    return deliveryInstances;
  }
}

export default FindDeliveryInstancesByDeliveryService;
