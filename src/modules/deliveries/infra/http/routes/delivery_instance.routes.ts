import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import DeliveryInstanceController from '../controllers/DeliveryInstanceController';

const deliveryInstanceRouter = Router();
const deliveryInstanceController = new DeliveryInstanceController();

deliveryInstanceRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      status: Joi.string().required(),
    },
  }),
  ensureAuthenticated,
  deliveryInstanceController.updateStatus,
);

deliveryInstanceRouter.get(
  '/delivery/:id',
  deliveryInstanceController.findByDelivery,
);

deliveryInstanceRouter.get(
  '/client/:id',
  deliveryInstanceController.findByClient,
);

deliveryInstanceRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      client_id: Joi.string().uuid().required(),
      delivery_id: Joi.string().uuid().required(),
    },
  }),
  ensureAuthenticated,
  deliveryInstanceController.create,
);

export default deliveryInstanceRouter;
