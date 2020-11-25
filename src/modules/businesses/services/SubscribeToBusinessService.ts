import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import BusinessClient from '@modules/businesses/infra/typeorm/entities/BusinessClient';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ITierRepository from '@modules/businesses/repositories/ITierRepository';
import IBusinessClientRepository from '@modules/businesses/repositories/IBusinessClientRepository';

interface IRequest {
  client_id: string;
  tier_id: string;
}

@injectable()
class SubscribeToBusinessService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('TierRepository')
    private tierRepository: ITierRepository,

    @inject('BusinessClientRepository')
    private businessClientRepository: IBusinessClientRepository,
  ) {}

  public async execute({
    client_id,
    tier_id,
  }: IRequest): Promise<BusinessClient> {
    const findUser = await this.usersRepository.findById(client_id);

    if (!findUser) {
      throw new AppError('User does not exist');
    }

    const findTier = await this.tierRepository.findById(tier_id);

    if (!findTier) {
      throw new AppError('Tier does not exist');
    }

    const alreadySubscribed = await this.businessClientRepository.findSubscription(
      {
        client_id,
        tier_id,
      },
    );

    if (alreadySubscribed) {
      throw new AppError('You are already subscribed to this tier');
    }

    const clientSubscriptions = await this.businessClientRepository.findSubscribed(
      client_id,
    );

    const subscribedToAnotherTier = clientSubscriptions.find(
      async clientSubscription => {
        const findTierInSubscription = await this.tierRepository.findById(
          clientSubscription.tier_id,
        );

        if (!findTierInSubscription) {
          throw new Error('Internal server error');
        }

        return findTierInSubscription.business_id === findTier.business_id;
      },
    );

    if (subscribedToAnotherTier) {
      await this.businessClientRepository.delete(subscribedToAnotherTier.id);
    }

    const subscription = await this.businessClientRepository.create({
      client_id,
      tier_id,
    });

    return subscription;
  }
}

export default SubscribeToBusinessService;
