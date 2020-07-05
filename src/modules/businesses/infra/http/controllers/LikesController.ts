import { Request, Response } from 'express';
import { container } from 'tsyringe';

import LikeUnlikeService from '@modules/businesses/services/LikeUnlikeService';
import ListLikesByPostService from '@modules/businesses/services/ListLikesByPostService';

export default class LikesController {
  public async likeUnlike(req: Request, res: Response): Promise<Response> {
    const { id: client_id } = req.user;
    const { business_post_id } = req.body;

    const likeUnlike = container.resolve(LikeUnlikeService);

    const like = await likeUnlike.execute({
      business_post_id,
      client_id,
    });

    return like ? res.json(like) : res.json('Unlike successful');
  }

  public async findAllInPost(req: Request, res: Response): Promise<Response> {
    const { id: business_post_id } = req.body;

    const findLikes = container.resolve(ListLikesByPostService);

    const foundLikes = await findLikes.execute({
      business_post_id,
    });

    return res.json(foundLikes);
  }
}
