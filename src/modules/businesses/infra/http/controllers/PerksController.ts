import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreatePerkService from '@modules/businesses/services/CreatePerkService';
import ListPerksByTierService from '@modules/businesses/services/ListPerksByTierService';
import DeletePerkService from '@modules/businesses/services/DeletePerkService';

export default class PerksController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { id: client_id } = req.user;
    const { title, desc, image_url, tier_id } = req.body;

    const createPerk = container.resolve(CreatePerkService);

    const perk = await createPerk.execute({
      client_id,
      title,
      desc,
      image_url,
      tier_id,
    });

    return res.json(perk);
  }

  public async findAllInTier(req: Request, res: Response): Promise<Response> {
    const { id: tier_id } = req.params;

    const findPerks = container.resolve(ListPerksByTierService);

    const foundPerks = await findPerks.execute({
      tier_id,
    });

    return res.json(foundPerks);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id: client_id } = req.user;
    const { id: perk_id } = req.params;

    const deletePerk = container.resolve(DeletePerkService);

    await deletePerk.execute({
      client_id,
      perk_id,
    });

    return res.json('Perk deleted successfully');
  }
}
