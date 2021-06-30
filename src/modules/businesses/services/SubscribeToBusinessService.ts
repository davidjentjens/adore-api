/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
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

async function findAsyncSequential<T>(
  array: T[],
  predicate: (t: T) => Promise<boolean>,
): Promise<T | undefined> {
  for (const t of array) {
    if (await predicate(t)) {
      return t;
    }
  }
  return undefined;
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

    const alreadySubscribed =
      await this.businessClientRepository.findSubscription({
        client_id,
        tier_id,
      });

    if (alreadySubscribed) {
      throw new AppError('You are already subscribed to this tier');
    }

    const clientSubscriptions =
      await this.businessClientRepository.findSubscribed(client_id);

    const subscribedToAnotherTier = await findAsyncSequential(
      clientSubscriptions,
      async clientSubscription => {
        const findTierInSubscription = await this.tierRepository.findById(
          clientSubscription.tier_id,
        );

        return findTierInSubscription?.business_id === findTier.business_id;
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
