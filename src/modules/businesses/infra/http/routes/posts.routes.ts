import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import BusinessPostController from '../controllers/BusinessPostController';

const postRouter = Router();

const businessPostController = new BusinessPostController();

// List
postRouter.get('/:id', businessPostController.findAll);

// Create
postRouter.post(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      short_desc: Joi.string().required(),
      desc: Joi.string().required(),
      business_id: Joi.string().required(),
      image_url: Joi.string().required(),
    },
  }),
  businessPostController.create,
);

// Delete
postRouter.delete('/:id', ensureAuthenticated, businessPostController.delete);

export default postRouter;