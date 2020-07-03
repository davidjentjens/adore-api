import { inject, injectable } from 'tsyringe';

import Business from '@modules/businesses/infra/typeorm/entities/Business';
import IBusinessRepository from '@modules/businesses/repositories/IBusinessRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  type:
    | 'Cervejaria'
    | 'Hamburgueria'
    | 'Pizzaria'
    | 'Gelateria'
    | 'Padaria'
    | 'Queijaria'
    | 'Cafeteria';
}

@injectable()
class ListBusinessesByTypeService {
  constructor(
    @inject('BusinessRepository')
    private businessRepository: IBusinessRepository,
  ) {}

  public async execute({ type }: IRequest): Promise<Business[] | undefined> {
    const businessTypes = [
      'Cervejaria',
      'Hamburgueria',
      'Pizzaria',
      'Gelateria',
      'Padaria',
      'Queijaria',
      'Cafeteria',
    ];

    if (!businessTypes.includes(type)) {
      throw new AppError('Business type does not exist');
    }

    const businesses = await this.businessRepository.findByType(type);

    return businesses;
  }
}

export default ListBusinessesByTypeService;
