import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Category from '@modules/businesses/infra/typeorm/entities/Category';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICategoriesRepository from '@modules/businesses/repositories/ICategoriesRepository';

import ICategoryDTO from '@modules/businesses/dtos/ICategoryDTO';

interface IRequest extends ICategoryDTO {
  user_id: string;
}

@injectable()
class CreateCategoryService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute({
    user_id,
    name,
    image_url,
  }: IRequest): Promise<Category> {
    const findUser = await this.usersRepository.findById(user_id);

    if (!findUser) {
      throw new AppError('User does not exist');
    }

    if (findUser.name !== 'admin' && findUser.name !== 'Admin') {
      throw new AppError('Only admin users can create a category');
    }

    const category = await this.categoriesRepository.create({
      name,
      image_url,
    });

    return category;
  }
}

export default CreateCategoryService;
