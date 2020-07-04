import { getRepository, Repository } from 'typeorm';

import IBusinessDTO from '@modules/businesses/dtos/IBusinessDTO';
import IBusinessRepository from '../../../repositories/IBusinessRepository';

import Business from '../entities/Business';

class BusinessRepository implements IBusinessRepository {
  private ormRepository: Repository<Business>;

  constructor() {
    this.ormRepository = getRepository(Business);
  }

  public async create({
    name,
    category_id,
    desc,
    owner_id,
    latitude,
    longitude,
    image_url,
    featured,
    email,
    whatsapp,
  }: IBusinessDTO): Promise<Business> {
    const business = this.ormRepository.create({
      name,
      category_id,
      desc,
      owner_id,
      latitude,
      longitude,
      image_url,
      featured,
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

  public async findByType(category_id: string): Promise<Business[]> {
    const findBusinesses = await this.ormRepository.find({
      where: { category_id },
    });

    return findBusinesses;
  }

  public async findAllFeatured(): Promise<Business[]> {
    const findFeaturedBusinesses = await this.ormRepository.find({
      where: { featured: true },
    });

    return findFeaturedBusinesses;
  }

  public async save(business: Business): Promise<Business> {
    return this.ormRepository.save(business);
  }

  public async delete(business: Business): Promise<void> {
    await this.ormRepository.remove(business);
  }
}

export default BusinessRepository;
