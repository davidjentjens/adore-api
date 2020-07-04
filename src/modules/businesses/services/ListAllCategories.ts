import { inject, injectable } from 'tsyringe';

import Category from '@modules/businesses/infra/typeorm/entities/Category';
import ICategoriesRepository from '@modules/businesses/repositories/ICategoriesRepository';

@injectable()
class ListAllCategories {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute(): Promise<Category[]> {
    const categories = await this.categoriesRepository.findAll();

    return categories;
  }
}

export default ListAllCategories;
