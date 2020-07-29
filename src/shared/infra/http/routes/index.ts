import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import businessRouter from '@modules/businesses/infra/http/routes/business.routes';
import subscriptionsRouter from '@modules/businesses/infra/http/routes/subscriptions.routes';
import tierRouter from '@modules/businesses/infra/http/routes/tiers.routes';
import categoriesRouter from '@modules/businesses/infra/http/routes/category.routes';
import postsRouter from '@modules/businesses/infra/http/routes/posts.routes';
import likesRouter from '@modules/businesses/infra/http/routes/likes.routes';
import perksRouter from '@modules/businesses/infra/http/routes/perks.routes';
import deliveryRouter from '@modules/deliveries/infra/http/routes/delivery.routes';
import deliveryInstanceRouter from '@modules/deliveries/infra/http/routes/delivery_instance.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);

routes.use('/business', businessRouter);
routes.use('/subscriptions', subscriptionsRouter);
routes.use('/tiers', tierRouter);
routes.use('/categories', categoriesRouter);
routes.use('/posts', postsRouter);
routes.use('/likes', likesRouter);
routes.use('/perks', perksRouter);

routes.use('/delivery', deliveryRouter);
routes.use('/delivery_instance', deliveryInstanceRouter);

export default routes;
