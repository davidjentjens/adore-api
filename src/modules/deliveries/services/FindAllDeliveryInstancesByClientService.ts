import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IDeliveryInstanceRepository from '@modules/deliveries/repositories/IDeliveryInstanceRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import DeliveryInstance from '../infra/typeorm/entities/DeliveryInstance';

interface IRequest {
  client_id: string;
}

@injectable()
class FindAllDeliveryInstancesByClientService {
  constructor(
    @inject('DeliveryInstanceRepository')
    private deliveryInstanceRepository: IDeliveryInstanceRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ client_id }: IRequest): Promise<DeliveryInstance[]> {
    const client = await this.usersRepository.findById(client_id);

    if (!client) {
      throw new AppError('Client not found', 404);
    }

    const deliveryInstances = await this.deliveryInstanceRepository.findByClient(
      client_id,
    );

    return deliveryInstances;
  }
}

export default FindAllDeliveryInstancesByClientService;
