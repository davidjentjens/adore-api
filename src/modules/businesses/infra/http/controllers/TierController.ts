import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateTierService from '@modules/businesses/services/CreateTierService';
import ListTiersByBusiness from '@modules/businesses/services/ListTiersByBusiness';
import FindTierService from '@modules/businesses/services/FindTierService';

export default class BusinessController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { id: owner_id } = req.user;
    const { business_id, name, desc, value, rank, image_url } = req.body;

    const createTier = container.resolve(CreateTierService);

    const tier = await createTier.execute({
      owner_id,
      business_id,
      name,
      desc,
      value,
      rank,
      image_url,
    });

    return res.json(tier);
  }

  public async find(req: Request, res: Response): Promise<Response> {
    const { id: tier_id } = req.params;

    const findTier = container.resolve(FindTierService);

    const tier = await findTier.execute({
      tier_id,
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
