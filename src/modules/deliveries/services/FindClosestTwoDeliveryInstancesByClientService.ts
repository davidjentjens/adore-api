import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IDeliveryInstanceRepository from '@modules/deliveries/repositories/IDeliveryInstanceRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import DeliveryInstance from '../infra/typeorm/entities/DeliveryInstance';

interface IRequest {
  client_id: string;
}

@injectable()
class FindClosestTwoDeliveryInstancesByClientService {
  constructor(
    @inject('DeliveryInstanceRepository')
    private deliveryInstanceRepository: IDeliveryInstanceRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ client_id }: IRequest): Promise<DeliveryInstance[]> {
    const client = await this.usersRepository.findById(client_id);

    if (!client) {
      throw new AppError('Client not found', 404);
    }

    const deliveryInstances = await this.deliveryInstanceRepository.findClosestByClientOrderedByDate(
      client_id,
    );

    console.log(deliveryInstances);

    return deliveryInstances;
  }
}

export default FindClosestTwoDeliveryInstancesByClientService;
