import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import BusinessController from '../controllers/BusinessController';

const businessRouter = Router();

const businessController = new BusinessController();

// Find
businessRouter.get('/:id', businessController.find);

// List
businessRouter.get('/', businessController.findAll);
businessRouter.get('/featured', businessController.findAllFeatured);
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
      image_url: Joi.string().required(),
      whatsapp: Joi.string().required(),
      category_id: Joi.string().required(),
      featured: Joi.boolean().required(),
    },
  }),
  businessController.create,
);

// Delete
businessRouter.delete('/:id', ensureAuthenticated, businessController.delete);

export default businessRouter;
