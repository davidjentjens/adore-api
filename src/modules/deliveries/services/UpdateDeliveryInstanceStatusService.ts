import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IDeliveryInstanceRepository from '@modules/deliveries/repositories/IDeliveryInstanceRepository';

import DeliveryInstance from '../infra/typeorm/entities/DeliveryInstance';

interface IRequest {
  delivery_instance_id: string;
  owner_id: string;
  status: 'preparing' | 'shipping' | 'delivered' | 'pending' | 'blocked';
}

@injectable()
class UpdateDeliveryInstanceStatusService {
  constructor(
    @inject('DeliveryInstanceRepository')
    private deliveryInstanceRepository: IDeliveryInstanceRepository,
  ) {}

  public async execute({
    owner_id,
    delivery_instance_id,
    status,
  }: IRequest): Promise<DeliveryInstance> {
    const deliveryInstance = await this.deliveryInstanceRepository.findById(
      delivery_instance_id,
    );

    if (!deliveryInstance) {
      throw new AppError('Delivery Instance not found', 404);
    }

    if (deliveryInstance.delivery.perk.tier.business.owner_id !== owner_id) {
      throw new AppError('You are not the owner of this business', 403);
    }

    deliveryInstance.status = status;

    await this.deliveryInstanceRepository.save(deliveryInstance);

    return deliveryInstance;
  }
}

export default UpdateDeliveryInstanceStatusService;
