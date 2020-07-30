import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateDeliveryService from '@modules/deliveries/services/CreateDeliveryService';
import FindDeliveryByPerkService from '@modules/deliveries/services/FindDeliveryByPerkService';

export default class DeliveryController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { id: owner_id } = req.user;
    const { date, perk_id } = req.body;

    const createDelivery = container.resolve(CreateDeliveryService);

    const delivery = await createDelivery.execute({
      owner_id,
      date,
      perk_id,
    });

    return res.json(delivery);
  }

  public async findByPerk(req: Request, res: Response): Promise<Response> {
    const { id: perk_id } = req.params;

    const findDeliveryByPerk = container.resolve(FindDeliveryByPerkService);

    const deliveries = await findDeliveryByPerk.execute({
      perk_id,
    });

    return res.json(deliveries);
  }
}
