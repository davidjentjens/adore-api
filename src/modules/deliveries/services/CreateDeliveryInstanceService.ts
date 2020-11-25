import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IDeliveryInstanceRepository from '@modules/deliveries/repositories/IDeliveryInstanceRepository';
import IDeliveryRepository from '@modules/deliveries/repositories/IDeliveryRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';

import IDeliveryInstanceDTO from '../dtos/IDeliveryInstanceDTO';
import DeliveryInstance from '../infra/typeorm/entities/DeliveryInstance';

interface IRequest extends IDeliveryInstanceDTO {
  owner_id: string;
}

@injectable()
class CreateDeliveryInstanceService {
  constructor(
    @inject('DeliveryInstanceRepository')
    private deliveryInstanceRepository: IDeliveryInstanceRepository,

    @inject('DeliveryRepository')
    private deliveryRepository: IDeliveryRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    owner_id,
    client_id,
    delivery_id,
    status,
  }: IRequest): Promise<DeliveryInstance> {
    const delivery = await this.deliveryRepository.findById(delivery_id);

    if (!delivery) {
      throw new AppError('Delivery not found');
    }

    console.log(delivery);

    const deliveryInstance = await this.deliveryInstanceRepository.create({
      client_id,
      delivery_id,
      status,
    });

    return deliveryInstance;
  }
}

export default CreateDeliveryInstanceService;
