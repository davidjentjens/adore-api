import Category from '../infra/typeorm/entities/Category';

import ICategory from '../dtos/ICategoryDTO';

export default interface IBusinessClientRepository {
  create(data: ICategory): Promise<Category>;
  findById(category_id: string): Promise<Category | undefined>;
  findAll(): Promise<Category[]>;
}
