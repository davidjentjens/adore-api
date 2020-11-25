import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IDeliveryInstanceRepository from '@modules/deliveries/repositories/IDeliveryInstanceRepository';

import DeliveryInstance from '../infra/typeorm/entities/DeliveryInstance';

interface IRequest {
  delivery_instance_id: string;
}

@injectable()
class FindDeliveryInstanceService {
  constructor(
    @inject('DeliveryInstanceRepository')
    private deliveryInstanceRepository: IDeliveryInstanceRepository,
  ) {}

  public async execute({
    delivery_instance_id,
  }: IRequest): Promise<DeliveryInstance> {
    const deliveryInstance = await this.deliveryInstanceRepository.findById(
      delivery_instance_id,
    );

    if (!deliveryInstance) {
      throw new AppError('Delivery Instance not found', 404);
    }

    return deliveryInstance;
  }
}

export default FindDeliveryInstanceService;
