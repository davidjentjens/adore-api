import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import LikesController from '../controllers/LikesController';

const likesRouter = Router();

const likesController = new LikesController();

// List
likesRouter.get('/:id', likesController.findAllInPost);

// Create
likesRouter.post(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      business_post_id: Joi.string().guid().required(),
    },
  }),
  likesController.likeUnlike,
);

export default likesRouter;
