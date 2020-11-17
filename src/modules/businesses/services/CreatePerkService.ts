import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Perk from '@modules/businesses/infra/typeorm/entities/Perk';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ITierRepository from '@modules/businesses/repositories/ITierRepository';
import IPerksRepository from '@modules/businesses/repositories/IPerksRepository';

import IPerkDTO from '@modules/businesses/dtos/IPerkDTO';

interface IRequest extends IPerkDTO {
  client_id: string;
}

@injectable()
class CreatePerkService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('TierRepository')
    private tierRepository: ITierRepository,

    @inject('PerksRepository')
    private perksRepository: IPerksRepository,
  ) {}

  public async execute({
    client_id,
    title,
    desc,
    image_url,
    tier_id,
  }: IRequest): Promise<Perk> {
    const findTier = await this.tierRepository.find(tier_id);

    if (!findTier) {
      throw new AppError('Tier does not exist');
    }

    const findUser = await this.usersRepository.findById(client_id);

    if (!findUser) {
      throw new AppError('User does not exist');
    }

    if (findTier.business.owner_id !== client_id) {
      throw new AppError('Only the owner of the business can create perks');
    }

    const perk = await this.perksRepository.create({
      title,
      desc,
      image_url,
      tier_id,
    });

    return perk;
  }
}

export default CreatePerkService;
