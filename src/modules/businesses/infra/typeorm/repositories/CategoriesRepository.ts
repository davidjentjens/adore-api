import { getRepository, Repository } from 'typeorm';

import ICategoryDTO from '../../../dtos/ICategoryDTO';
import ICategoriesRepository from '../../../repositories/ICategoriesRepository';

import Category from '../entities/Category';

class CategoriesRepository implements ICategoriesRepository {
  private ormRepository: Repository<Category>;

  constructor() {
    this.ormRepository = getRepository(Category);
  }

  public async create({ name, image_url }: ICategoryDTO): Promise<Category> {
    const category = this.ormRepository.create({
      name,
      image_url,
    });

    await this.ormRepository.save(category);

    return category;
  }

  public async find(category_id: string): Promise<Category | undefined> {
    const findCategory = await this.ormRepository.findOne({
      where: { id: category_id },
    });

    return findCategory;
  }

  public async findAll(): Promise<Category[]> {
    const findCategories = await this.ormRepository.find();

    return findCategories;
  }
}

export default CategoriesRepository;
