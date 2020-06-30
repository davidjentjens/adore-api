import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import BusinessController from '../controllers/BusinessController';

const businessRouter = Router();

const businessController = new BusinessController();

businessRouter.get('/', businessController.findAll);

businessRouter.post('/', ensureAuthenticated, businessController.create);

export default businessRouter;
