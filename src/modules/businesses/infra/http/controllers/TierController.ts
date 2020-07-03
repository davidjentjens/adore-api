import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateTierService from '@modules/businesses/services/CreateTierService';
import ListTiersByBusiness from '@modules/businesses/services/ListTiersByBusiness';

export default class BusinessController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { business_id, name, desc, value, rank } = req.body;

    const createTier = container.resolve(CreateTierService);

    const tier = await createTier.execute({
      business_id,
      name,
      desc,
      value,
      rank,
    });

    return res.json(tier);
  }

  public async listByBusiness(req: Request, res: Response): Promise<Response> {
    const { id: business_id } = req.params;

    const listTiersByBusiness = container.resolve(ListTiersByBusiness);

    const foundTiers = await listTiersByBusiness.execute({ business_id });

    return res.json(foundTiers);
  }
}
