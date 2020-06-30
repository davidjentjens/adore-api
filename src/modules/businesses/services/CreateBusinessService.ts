import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Business from '@modules/businesses/infra/typeorm/entities/Business';
import IBusinessRepository from '@modules/businesses/repositories/IBusinessRepository';

interface IRequest {
  owner_id: string;
  name: string;
  latitude: number;
  longitude: number;
  email?: string;
  whatsapp?: string;
}

@injectable()
class CreateBusinessService {
  constructor(
    @inject('BusinessRepository')
    private businessRepository: IBusinessRepository,
  ) {}

  public async execute({
    owner_id,
    name,
    latitude,
    longitude,
    email,
    whatsapp,
  }: IRequest): Promise<Business> {
    const findBusiness = await this.businessRepository.findByName(name);

    if (findBusiness) {
      throw new AppError('A business by this name already exists');
    }

    const business = await this.businessRepository.create({
      owner_id,
      name,
      latitude,
      longitude,
      email,
      whatsapp,
    });

    return business;
  }
}

export default CreateBusinessService;
