import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Business from '@modules/businesses/infra/typeorm/entities/Business';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICategoriesRepository from '@modules/businesses/repositories/ICategoriesRepository';
import IBusinessRepository from '@modules/businesses/repositories/IBusinessRepository';

import IRequest from '@modules/businesses/dtos/IBusinessDTO';

@injectable()
class CreateBusinessService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,

    @inject('BusinessRepository')
    private businessRepository: IBusinessRepository,
  ) {}

  public async execute({
    owner_id,
    category_id,
    name,
    desc,
    logo_url,
    zone,
    latitude,
    longitude,
    image_url,
    featured,
    email,
    whatsapp,
  }: IRequest): Promise<Business> {
    const findBusinessWithSameName = await this.businessRepository.findByName(
      name,
    );

    if (findBusinessWithSameName) {
      throw new AppError('A business by this name already exists');
    }

    const findOwner = await this.usersRepository.findById(owner_id);

    if (!findOwner) {
      throw new AppError('Business owner does not exist');
    }

    const findCategory = await this.categoriesRepository.findById(category_id);

    if (!findCategory) {
      throw new AppError('Category does not exist');
    }

    const business = await this.businessRepository.create({
      owner_id,
      category_id,
      name,
      desc,
      logo_url,
      zone,
      latitude,
      longitude,
      image_url,
      featured,
      email,
      whatsapp,
    });

    return business;
  }
}

export default CreateBusinessService;
