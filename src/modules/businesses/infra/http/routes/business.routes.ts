import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import BusinessController from '../controllers/BusinessController';

const businessRouter = Router();

const businessController = new BusinessController();

// List
businessRouter.get('/', businessController.findAll);
businessRouter.post('/type', businessController.findByType);

// Create
businessRouter.post(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      desc: Joi.string().required(),
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
      email: Joi.string().email().required(),
      whatsapp: Joi.string().required(),
      type: Joi.string().required(),
    },
  }),
  businessController.create,
);

export default businessRouter;
