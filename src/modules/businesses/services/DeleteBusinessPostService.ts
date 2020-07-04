import { inject, injectable } from 'tsyringe';

import IBusinessRepository from '@modules/businesses/repositories/IBusinessRepository';
import IBusinessPostsRepository from '@modules/businesses/repositories/IBusinessPostsRepository';

import AppError from '@shared/errors/AppError';

interface IRequest {
  owner_id: string;
  business_post_id: string;
}

@injectable()
class DeleteBusinessPostService {
  constructor(
    @inject('BusinessRepository')
    private businessRepository: IBusinessRepository,

    @inject('BusinessPostsRepository')
    private businessPostsRepository: IBusinessPostsRepository,
  ) {}

  public async execute({
    owner_id,
    business_post_id,
  }: IRequest): Promise<void> {
    const findBusinessPost = await this.businessPostsRepository.find(
      business_post_id,
    );

    if (!findBusinessPost) {
      throw new AppError('Post does not exist');
    }

    const findBusiness = await this.businessRepository.find(
      findBusinessPost.business_id,
    );

    if (!findBusiness) {
      throw new AppError('Business does not exist', 404);
    }

    if (findBusiness.owner_id !== owner_id) {
      throw new AppError(
        'Only the owner of the business can delete their posts on their page',
      );
    }

    await this.businessPostsRepository.delete(findBusinessPost);
  }
}

export default DeleteBusinessPostService;
