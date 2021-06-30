import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import TierController from '../controllers/TierController';

const tierRouter = Router();
const tierController = new TierController();

// List
tierRouter.get('/business/:id', tierController.listByBusiness);

// Find
tierRouter.get('/:id', tierController.find);

// Create
tierRouter.post(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      business_id: Joi.string().guid().required(),
      name: Joi.string().required(),
      desc: Joi.string().required(),
      value: Joi.number().required(),
      rank: Joi.number().required(),
      image_url: Joi.string().required(),
    },
  }),
  tierController.create,
);

export default tierRouter;
