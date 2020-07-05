import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateBusinessService from '@modules/businesses/services/CreateBusinessService';
import FindBusinessesService from '@modules/businesses/services/FindBusinessService';
import ListAllBusinessesService from '@modules/businesses/services/ListAllBusinessesService';
import ListAllFeaturedBusinessesService from '@modules/businesses/services/ListAllFeaturedBusinessesService';
import ListBusinessesByType from '@modules/businesses/services/ListBusinessesByType';
import DeleteBusinessService from '@modules/businesses/services/DeleteBusinessService';

export default class BusinessController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { id: owner_id } = req.user;
    const {
      name,
      desc,
      logo_url,
      latitude,
      longitude,
      image_url,
      zone,
      featured,
      email,
      whatsapp,
      category_id,
    } = req.body;

    const createBusiness = container.resolve(CreateBusinessService);

    const business = await createBusiness.execute({
      owner_id,
      name,
      desc,
      logo_url,
      zone,
      latitude,
      longitude,
      image_url,
      featured,
      email,
      whatsapp,
      category_id,
    });

    return res.json(business);
  }

  public async find(req: Request, res: Response): Promise<Response> {
    const { id: business_id } = req.params;

    const findBusiness = container.resolve(FindBusinessesService);

    const foundBusiness = await findBusiness.execute({ business_id });

    return res.json(foundBusiness);
  }

  public async findAll(req: Request, res: Response): Promise<Response> {
    const findAllBusinesses = container.resolve(ListAllBusinessesService);

    const foundBusinesses = await findAllBusinesses.execute();

    return res.json(foundBusinesses);
  }

  public async findAllFeatured(req: Request, res: Response): Promise<Response> {
    const findAllFeaturedBusinesses = container.resolve(
      ListAllFeaturedBusinessesService,
    );

    const foundFeaturedBusinesses = await findAllFeaturedBusinesses.execute();

    return res.json(foundFeaturedBusinesses);
  }

  public async findByType(req: Request, res: Response): Promise<Response> {
    const { category_id } = req.body;

    const findBusinessesByType = container.resolve(ListBusinessesByType);

    const foundBusinesses = await findBusinessesByType.execute({ category_id });

    return res.json(foundBusinesses);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id: owner_id } = req.user;
    const { id: business_id } = req.params;

    const deleteBusiness = container.resolve(DeleteBusinessService);

    const business = await deleteBusiness.execute({
      owner_id,
      business_id,
    });

    return res.json(business);
  }
}
