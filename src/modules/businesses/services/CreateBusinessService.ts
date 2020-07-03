import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Business from '@modules/businesses/infra/typeorm/entities/Business';
import IBusinessRepository from '@modules/businesses/repositories/IBusinessRepository';

import IRequest from '@modules/businesses/dtos/IBusinessDTO';

@injectable()
class CreateBusinessService {
  constructor(
    @inject('BusinessRepository')
    private businessRepository: IBusinessRepository,
  ) {}

  public async execute({
    owner_id,
    type,
    name,
    desc,
    latitude,
    longitude,
    email,
    whatsapp,
  }: IRequest): Promise<Business> {
    const findBusinessWithSameName = await this.businessRepository.findByName(
      name,
    );

    if (findBusinessWithSameName) {
      throw new AppError('A business by this name already exists');
    }

    const business = await this.businessRepository.create({
      owner_id,
      type,
      name,
      desc,
      latitude,
      longitude,
      email,
      whatsapp,
    });

    return business;
  }
}

export default CreateBusinessService;
