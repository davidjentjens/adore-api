import { inject, injectable } from 'tsyringe';

import Business from '@modules/businesses/infra/typeorm/entities/Business';

import IBusinessRepository from '@modules/businesses/repositories/IBusinessRepository';
import ICategoriesRepository from '@modules/businesses/repositories/ICategoriesRepository';

import AppError from '@shared/errors/AppError';

interface IRequest {
  category_id: string;
}

@injectable()
class ListBusinessesByTypeService {
  constructor(
    @inject('BusinessRepository')
    private businessRepository: IBusinessRepository,

    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute({
    category_id,
  }: IRequest): Promise<Business[] | undefined> {
    const category = await this.categoriesRepository.find(category_id);

    if (!category) {
      throw new AppError('Category does not exist');
    }

    const businesses = await this.businessRepository.findByType(category.id);

    return businesses;
  }
}

export default ListBusinessesByTypeService;
