import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import SubscriptionsController from '../controllers/SubscriptionsController';

const subscriptionsRouter = Router();

const subscriptionsController = new SubscriptionsController();

subscriptionsRouter.get(
  '/',
  ensureAuthenticated,
  subscriptionsController.findAll,
);

subscriptionsRouter.post(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      tier_id: Joi.string().guid().required(),
    },
  }),
  subscriptionsController.create,
);

subscriptionsRouter.delete(
  '/:id',
  ensureAuthenticated,
  subscriptionsController.delete,
);

export default subscriptionsRouter;
