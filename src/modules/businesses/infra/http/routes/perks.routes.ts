import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import PerksController from '../controllers/PerksController';

const perksRouter = Router();

const perksController = new PerksController();

// List
perksRouter.get('/next', ensureAuthenticated, perksController.findClosest);
perksRouter.get('/:id', perksController.findAllInTier);

// Find
// perksRouter.get('/:id', perksController.find);

// Create
perksRouter.post(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      desc: Joi.string().required(),
      image_url: Joi.string().required(),
      tier_id: Joi.string().required(),
    },
  }),
  perksController.create,
);

// Delete
perksRouter.delete('/:id', ensureAuthenticated, perksController.delete);

export default perksRouter;
