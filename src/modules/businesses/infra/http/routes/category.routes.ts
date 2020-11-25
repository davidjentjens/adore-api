import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import CategoryController from '../controllers/CategoryController';

const categoriesRouter = Router();

const categoriesController = new CategoryController();

// List
categoriesRouter.get('/', categoriesController.findAll);

// Create
categoriesRouter.post(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      image_url: Joi.string().guid().required(),
    },
  }),
  categoriesController.create,
);

export default categoriesRouter;
