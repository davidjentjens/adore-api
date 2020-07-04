import { inject, injectable } from 'tsyringe';

import Business from '@modules/businesses/infra/typeorm/entities/Business';
import IBusinessRepository from '@modules/businesses/repositories/IBusinessRepository';

@injectable()
class ListAllFeaturedBusinessesService {
  constructor(
    @inject('BusinessRepository')
    private businessRepository: IBusinessRepository,
  ) {}

  public async execute(): Promise<Business[] | undefined> {
    const featuredBusinesses = await this.businessRepository.findAllFeatured();

    return featuredBusinesses;
  }
}

export default ListAllFeaturedBusinessesService;
