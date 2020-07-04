import { inject, injectable } from 'tsyringe';

import Category from '@modules/businesses/infra/typeorm/entities/Category';
import ICategoriesRepository from '@modules/businesses/repositories/ICategoriesRepository';

import IRequest from '@modules/businesses/dtos/ICategoryDTO';

@injectable()
class CreateCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute({ name, image_url }: IRequest): Promise<Category> {
    const category = await this.categoriesRepository.create({
      name,
      image_url,
    });

    return category;
  }
}

export default CreateCategoryService;
