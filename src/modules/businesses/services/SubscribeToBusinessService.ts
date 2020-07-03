import { inject, injectable } from 'tsyringe';

import { isUuid } from 'uuidv4';

import AppError from '@shared/errors/AppError';

import BusinessClient from '@modules/businesses/infra/typeorm/entities/BusinessClient';
import IBusinessClientRepository from '@modules/businesses/repositories/IBusinessClientRepository';
import ITierRepository from '@modules/businesses/repositories/ITierRepository';

interface IRequest {
  client_id: string;
  business_id: string;
  tier_id: string;
}

@injectable()
class SubscribeToBusinessService {
  constructor(
    @inject('BusinessClientRepository')
    private businessClientRepository: IBusinessClientRepository,

    @inject('TierRepository')
    private tierRepository: ITierRepository,
  ) {}

  public async execute({
    client_id,
    business_id,
    tier_id,
  }: IRequest): Promise<BusinessClient> {
    if (!isUuid(tier_id)) {
      throw new AppError('Not valid Tier id');
    }

    const findTier = await this.tierRepository.find(tier_id);

    if (!findTier) {
      throw new AppError('Tier does not exist');
    }

    const alreadySubscribed = await this.businessClientRepository.findSameTierSubscription(
      {
        business_id,
        client_id,
        tier_id,
      },
    );

    if (alreadySubscribed) {
      throw new AppError('You are already subscribed to this tier');
    }

    const subscribedToAnotherTier = await this.businessClientRepository.findSubscription(
      { business_id, client_id },
    );

    if (subscribedToAnotherTier) {
      await this.businessClientRepository.delete(subscribedToAnotherTier.id);
    }

    const subscription = await this.businessClientRepository.create({
      business_id,
      client_id,
      tier_id,
    });

    return subscription;
  }
}

export default SubscribeToBusinessService;
