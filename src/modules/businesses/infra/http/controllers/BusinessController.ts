import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateBusinessService from '@modules/businesses/services/CreateBusinessService';
import ListAllBusinessesService from '@modules/businesses/services/ListAllBusinessesService';

export default class BusinessController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { id: owner_id } = req.user;
    const { name, latitude, longitude, email, whatsapp } = req.body;

    const createBusiness = container.resolve(CreateBusinessService);

    const business = await createBusiness.execute({
      owner_id,
      name,
      latitude,
      longitude,
      email,
      whatsapp,
    });

    return res.json(business);
  }

  public async findAll(req: Request, res: Response): Promise<Response> {
    const findAllBusinesses = container.resolve(ListAllBusinessesService);

    const foundBusinesses = await findAllBusinesses.execute();

    return res.json(foundBusinesses);
  }
}
