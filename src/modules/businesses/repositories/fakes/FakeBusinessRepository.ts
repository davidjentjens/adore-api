import { uuid } from 'uuidv4';

import IBusinessDTO from '@modules/businesses/dtos/IBusinessDTO';
import IBusinessRepository from '../IBusinessRepository';

import Business from '../../infra/typeorm/entities/Business';

class BusinessRepository implements IBusinessRepository {
  private businesses: Business[] = [];

  public async create(businessData: IBusinessDTO): Promise<Business> {
    const business = new Business();

    Object.assign(business, { id: uuid() }, businessData);

    this.businesses.push(business);

    return business;
  }

  public async find(business_id: string): Promise<Business | undefined> {
    const findBusiness = this.businesses.find(
      business => business.id === business_id,
    );

    return findBusiness;
  }

  public async findByName(
    business_name: string,
  ): Promise<Business | undefined> {
    const findBusiness = this.businesses.find(
      business => business.name === business_name,
    );

    return findBusiness;
  }

  public async findAll(): Promise<Business[]> {
    return this.businesses;
  }

  public async findByType(category_id: string): Promise<Business[]> {
    const findBusiness = this.businesses.filter(
      business => business.category_id === category_id,
    );

    return findBusiness;
  }

  public async findAllFeatured(): Promise<Business[]> {
    const findFeaturedBusinesses = this.businesses.filter(
      business => business.featured === true,
    );

    return findFeaturedBusinesses;
  }

  public async save(business: Business): Promise<Business> {
    const findIndex = this.businesses.findIndex(
      findBusiness => findBusiness.id === business.id,
    );

    this.businesses[findIndex] = business;

    return business;
  }

  public async delete(business_id: string): Promise<void> {
    this.businesses = this.businesses.filter(
      findBusiness => findBusiness.id !== business_id,
    );
  }
}

export default BusinessRepository;
