import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateBusinessPostService from '@modules/businesses/services/CreateBusinessPostService';
import ListBusinessPostsService from '@modules/businesses/services/ListBusinessPostsService';
import DeleteBusinessPostService from '@modules/businesses/services/DeleteBusinessPostService';

export default class BusinessController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { id: owner_id } = req.user;
    const { title, short_desc, desc, business_id, image_url } = req.body;

    const createBusinessPost = container.resolve(CreateBusinessPostService);

    const businessPost = await createBusinessPost.execute({
      owner_id,
      title,
      short_desc,
      desc,
      business_id,
      image_url,
    });

    return res.json(businessPost);
  }

  public async findAll(req: Request, res: Response): Promise<Response> {
    const { id: business_id } = req.params;

    const findAllBusinessPosts = container.resolve(ListBusinessPostsService);

    const foundBusinessPosts = await findAllBusinessPosts.execute({
      business_id,
    });

    return res.json(foundBusinessPosts);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id: owner_id } = req.user;
    const { id: business_post_id } = req.params;

    const deleteBusinessPost = container.resolve(DeleteBusinessPostService);

    await deleteBusinessPost.execute({ business_post_id, owner_id });

    return res.json('Post succesfully deleted');
  }
}
