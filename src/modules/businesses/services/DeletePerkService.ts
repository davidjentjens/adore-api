import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ITierRepository from '@modules/businesses/repositories/ITierRepository';
import IPerksRepository from '@modules/businesses/repositories/IPerksRepository';

interface IRequest {
  client_id: string;
  perk_id: string;
}

@injectable()
class DeletePerkService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('TierRepository')
    private tierRepository: ITierRepository,

    @inject('PerksRepository')
    private perksRepository: IPerksRepository,
  ) {}

  public async execute({ client_id, perk_id }: IRequest): Promise<void> {
    const findUser = await this.usersRepository.findById(client_id);

    if (!findUser) {
      throw new AppError('User does not exist');
    }

    const findPerk = await this.perksRepository.findById(perk_id);

    if (!findPerk) {
      throw new AppError('Perk not found', 404);
    }

    const findTier = await this.tierRepository.findById(findPerk.tier_id);

    if (!findTier) {
      throw new AppError('Tier does not exist');
    }

    if (findTier.business.owner_id !== client_id) {
      throw new AppError('Only the owner of the business can delete perks');
    }

    this.perksRepository.delete(perk_id);
  }
}

export default DeletePerkService;
