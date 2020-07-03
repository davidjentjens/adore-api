import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import TierController from '../controllers/TierController';

const tierRouter = Router();

const tierController = new TierController();

// List
tierRouter.get('/:id', tierController.listByBusiness);

// Create
tierRouter.post(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      business_id: Joi.string().required(),
      name: Joi.string().required(),
      desc: Joi.string().required(),
      value: Joi.number().required(),
      rank: Joi.number().required(),
    },
  }),
  tierController.create,
);

export default tierRouter;
