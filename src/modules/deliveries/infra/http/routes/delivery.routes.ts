import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import DeliveryController from '../controllers/DeliveryController';

const deliveryRouter = Router();
const deliveryController = new DeliveryController();

deliveryRouter.use(ensureAuthenticated);

deliveryRouter.get('/perk/:id', deliveryController.findByPerk);

deliveryRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      date: Joi.date(),
      perk_id: Joi.string().uuid().required(),
    },
  }),
  deliveryController.create,
);

export default deliveryRouter;
