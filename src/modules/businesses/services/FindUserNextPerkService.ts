import { inject, injectable } from 'tsyringe';
import { getDate, isAfter, closestTo } from 'date-fns';

import AppError from '@shared/errors/AppError';

import Perk from '@modules/businesses/infra/typeorm/entities/Perk';
import ITierRepository from '@modules/businesses/repositories/ITierRepository';
import IBusinessClientRepository from '@modules/businesses/repositories/IBusinessClientRepository';
import IPerksRepository from '@modules/businesses/repositories/IPerksRepository';

interface IRequest {
  client_id: string;
}

@injectable()
class FindUserNextPerkService {
  constructor(
    @inject('TierRepository')
    private tierRepository: ITierRepository,

    @inject('BusinessClientRepository')
    private businessClientRepository: IBusinessClientRepository,

    @inject('PerksRepository')
    private perksRepository: IPerksRepository,
  ) {}

  public async execute({ client_id }: IRequest): Promise<Perk> {
    const subscriptions = await this.businessClientRepository.findSubscribed(
      client_id,
    );

    const tier_ids = subscriptions.map(subscription => subscription.tier_id);

    const perkPromises = tier_ids.map(tier_id =>
      this.perksRepository.findByTier(tier_id),
    );

    const resolvedPerkLists = await Promise.all(perkPromises);

    const perks = resolvedPerkLists.reduce((a, b) => {
      return a.concat(b);
    }, []);

    if (!perks || !perks[0]) {
      throw new AppError('You must subscribe to a tier to get perks');
    }

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const perkDateList = new Array<Date>();

    perks.forEach(perk => {
      const perkDate = new Date(currentYear, currentMonth, perk.date, 0, 0, 0);

      if (isAfter(perkDate, currentDate)) {
        perkDateList.push(perkDate);
      }
    });

    const closestDateAfter = closestTo(currentDate, perkDateList);

    const closestPerk = await this.perksRepository.findOneWithSameDate(
      closestDateAfter.getDate(),
    );

    if (!closestPerk) {
      throw new AppError('You must subscribe to a tier to get perks');
    }

    return closestPerk;
  }
}

export default FindUserNextPerkService;
