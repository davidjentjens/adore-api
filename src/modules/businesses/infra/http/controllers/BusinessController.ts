import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateBusinessService from '@modules/businesses/services/CreateBusinessService';
import ListAllBusinessesService from '@modules/businesses/services/ListAllBusinessesService';
import ListBusinessesByType from '@modules/businesses/services/ListBusinessesByType';
import SubscribeToBusinessService from '@modules/businesses/services/SubscribeToBusinessService';

export default class BusinessController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { id: owner_id } = req.user;
    const { name, desc, latitude, longitude, email, whatsapp, type } = req.body;

    const createBusiness = container.resolve(CreateBusinessService);

    const business = await createBusiness.execute({
      owner_id,
      name,
      desc,
      latitude,
      longitude,
      email,
      whatsapp,
      type,
    });

    return res.json(business);
  }

  public async findAll(req: Request, res: Response): Promise<Response> {
    const findAllBusinesses = container.resolve(ListAllBusinessesService);

    const foundBusinesses = await findAllBusinesses.execute();

    return res.json(foundBusinesses);
  }

  public async findByType(req: Request, res: Response): Promise<Response> {
    const { type } = req.body;

    const findBusinessesByType = container.resolve(ListBusinessesByType);

    const foundBusinesses = await findBusinessesByType.execute({ type });

    return res.json(foundBusinesses);
  }

  public async subscribe(req: Request, res: Response): Promise<Response> {
    const { id: client_id } = req.user;
    const { business_id, tier_id } = req.body;

    const subscribeToBusiness = container.resolve(SubscribeToBusinessService);

    const business = await subscribeToBusiness.execute({
      client_id,
      business_id,
      tier_id,
    });

    return res.json(business);
  }
}
