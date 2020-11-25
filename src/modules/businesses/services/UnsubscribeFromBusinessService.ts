import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IBusinessClientRepository from '@modules/businesses/repositories/IBusinessClientRepository';

interface IRequest {
  subscription_id: string;
  client_id: string;
}

@injectable()
class UnsubscribeFromBusinessService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('BusinessClientRepository')
    private businessClientRepository: IBusinessClientRepository,
  ) {}

  public async execute({
    subscription_id,
    client_id,
  }: IRequest): Promise<void> {
    const findUser = await this.usersRepository.findById(client_id);

    if (!findUser) {
      throw new AppError('User does not exist');
    }

    const subscription = await this.businessClientRepository.findById(
      subscription_id,
    );

    if (!subscription || subscription.client_id !== client_id) {
      throw new AppError('You are not subscribed to this tier.');
    }

    await this.businessClientRepository.delete(subscription_id);
  }
}

export default UnsubscribeFromBusinessService;
