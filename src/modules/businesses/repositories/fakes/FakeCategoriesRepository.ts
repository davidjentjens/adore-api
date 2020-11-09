import { uuid } from 'uuidv4';

import ICategoryDTO from '@modules/businesses/dtos/ICategoryDTO';
import ICategoriesRepository from '../ICategoriesRepository';

import Category from '../../infra/typeorm/entities/Category';

class CategoryRepository implements ICategoriesRepository {
  private categories: Category[] = [];

  public async create(categoryData: ICategoryDTO): Promise<Category> {
    const category = new Category();

    Object.assign(category, { id: uuid() }, categoryData);

    this.categories.push(category);

    return category;
  }

  public async find(category_id: string): Promise<Category | undefined> {
    const findCategory = this.categories.find(
      category => category.id === category_id,
    );

    return findCategory;
  }

  public async findAll(): Promise<Category[]> {
    return this.categories;
  }
}

export default CategoryRepository;
