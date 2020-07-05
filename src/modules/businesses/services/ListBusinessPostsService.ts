import { inject, injectable } from 'tsyringe';

import IBusinessPostsRepository from '@modules/businesses/repositories/IBusinessPostsRepository';

import BusinessPost from '../infra/typeorm/entities/BusinessPost';

@injectable()
class ListBusinessPostsService {
  constructor(
    @inject('BusinessPostsRepository')
    private businessPostsRepository: IBusinessPostsRepository,
  ) {}

  public async execute(): Promise<BusinessPost[]> {
    const findBusinessPost = await this.businessPostsRepository.findAll();

    return findBusinessPost;
  }
}

export default ListBusinessPostsService;
