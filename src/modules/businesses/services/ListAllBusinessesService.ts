import { inject, injectable } from 'tsyringe';

import Business from '@modules/businesses/infra/typeorm/entities/Business';
import IBusinessRepository from '@modules/businesses/repositories/IBusinessRepository';

@injectable()
class ListAllBusinessesService {
  constructor(
    @inject('BusinessRepository')
    private businessRepository: IBusinessRepository,
  ) {}

  public async execute(): Promise<Business[]> {
    const businesses = await this.businessRepository.findAll();

    return businesses;
  }
}

export default ListAllBusinessesService;
