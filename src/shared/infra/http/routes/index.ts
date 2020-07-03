import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import businessRouter from '@modules/businesses/infra/http/routes/business.routes';
import subscriptionsRouter from '@modules/businesses/infra/http/routes/subscriptions.routes';
import tierRouter from '@modules/businesses/infra/http/routes/tiers.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);

routes.use('/business', businessRouter);
routes.use('/subscriptions', subscriptionsRouter);
routes.use('/tiers', tierRouter);

export default routes;
