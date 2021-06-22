import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IDeliveryInstanceRepository from '@modules/deliveries/repositories/IDeliveryInstanceRepository';
import IDeliveryRepository from '@modules/deliveries/repositories/IDeliveryRepository';

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
  ) {}

  public async execute({
    owner_id,
    client_id,
    delivery_id,
  }: IRequest): Promise<DeliveryInstance> {
    const delivery = await this.deliveryRepository.findById(delivery_id);

    if (!delivery) {
      throw new AppError('Delivery not found');
    }

    if (delivery.perk.tier.business.owner_id !== owner_id) {
      throw new AppError('You are not the owner of this business', 403);
    }

    const deliveryInstance = await this.deliveryInstanceRepository.create({
      client_id,
      delivery_id,
    });

    return deliveryInstance;
  }
}

export default CreateDeliveryInstanceService;
