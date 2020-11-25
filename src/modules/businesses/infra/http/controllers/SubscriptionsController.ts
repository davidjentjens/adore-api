import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SubscribeToBusinessService from '@modules/businesses/services/SubscribeToBusinessService';
import ListSubscriptionsService from '@modules/businesses/services/ListSubscriptionsService';
import UnsubscribeFromBusinessService from '@modules/businesses/services/UnsubscribeFromBusinessService';

export default class SubscriptionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { id: client_id } = req.user;
    const { tier_id } = req.body;

    const subscribeToBusiness = container.resolve(SubscribeToBusinessService);

    const business = await subscribeToBusiness.execute({
      client_id,
      tier_id,
    });

    return res.json(business);
  }

  public async findAll(req: Request, res: Response): Promise<Response> {
    const { id: client_id } = req.user;

    const findAllSubscriptions = container.resolve(ListSubscriptionsService);

    const foundSubscriptions = await findAllSubscriptions.execute({
      client_id,
    });

    return res.json(foundSubscriptions);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id: client_id } = req.user;
    const { id: subscription_id } = req.params;

    const unsubscribe = container.resolve(UnsubscribeFromBusinessService);

    await unsubscribe.execute({
      client_id,
      subscription_id,
    });

    return res.json('Unsubscription Successfull');
  }
}
