import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import BusinessClient from '@modules/businesses/infra/typeorm/entities/BusinessClient';
import IBusinessClientRepository from '@modules/businesses/repositories/IBusinessClientRepository';

interface IRequest {
  client_id: string;
}

@injectable()
class SubscribeToBusinessService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('BusinessClientRepository')
    private businessClientRepository: IBusinessClientRepository,
  ) {}

  public async execute({ client_id }: IRequest): Promise<BusinessClient[]> {
    const client = await this.usersRepository.findById(client_id);

    if (!client) {
      throw new AppError('Client does not exist');
    }

    const subscriptions = await this.businessClientRepository.findSubscribed(
      client_id,
    );

    return subscriptions;
  }
}

export default SubscribeToBusinessService;
