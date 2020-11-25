import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IBusinessRepository from '@modules/businesses/repositories/IBusinessRepository';

interface IRequest {
  owner_id: string;
  business_id: string;
}

@injectable()
class DeleteBusinessService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('BusinessRepository')
    private businessRepository: IBusinessRepository,
  ) {}

  public async execute({ owner_id, business_id }: IRequest): Promise<void> {
    const findUser = await this.usersRepository.findById(owner_id);

    if (!findUser) {
      throw new AppError('User does not exist');
    }

    const findBusiness = await this.businessRepository.findById(business_id);

    if (!findBusiness) {
      throw new AppError('Business does not exist', 404);
    }

    if (findBusiness.owner_id !== owner_id) {
      throw new AppError('You are not the owner of this business', 403);
    }

    await this.businessRepository.delete(findBusiness.id);
  }
}

export default DeleteBusinessService;
