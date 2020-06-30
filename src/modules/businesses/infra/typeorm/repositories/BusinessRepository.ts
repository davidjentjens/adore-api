import { getRepository, Repository } from 'typeorm';

import ICreateBusinessDTO from '@modules/businesses/dtos/ICreateBusinessDTO';
import IBusinessRepository from '../../../repositories/IBusinessRepository';

import Business from '../entities/Business';

class BusinessRepository implements IBusinessRepository {
  private ormRepository: Repository<Business>;

  constructor() {
    this.ormRepository = getRepository(Business);
  }

  public async create({
    name,
    owner_id,
    latitude,
    longitude,
    email,
    whatsapp,
  }: ICreateBusinessDTO): Promise<Business> {
    const business = this.ormRepository.create({
      name,
      owner_id,
      latitude,
      longitude,
      email,
      whatsapp,
    });

    await this.ormRepository.save(business);

    return business;
  }

  public async find(business_id: string): Promise<Business | undefined> {
    const findBusiness = await this.ormRepository.findOne({
      where: { id: business_id },
    });

    return findBusiness;
  }

  public async findByName(
    business_name: string,
  ): Promise<Business | undefined> {
    const findBusiness = await this.ormRepository.findOne({
      where: { name: business_name },
    });

    return findBusiness;
  }

  public async findAll(): Promise<Business[]> {
    const findBusinesses = await this.ormRepository.find();

    return findBusinesses;
  }

  public async save(business: Business): Promise<Business> {
    return this.ormRepository.save(business);
  }

  public async delete(business: Business): Promise<void> {
    await this.ormRepository.remove(business);
  }
}

export default BusinessRepository;
