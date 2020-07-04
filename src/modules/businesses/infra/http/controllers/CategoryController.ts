import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCategoryService from '@modules/businesses/services/CreateCategoryService';
import ListAllCategories from '@modules/businesses/services/ListAllCategories';

export default class CategoryController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { id: owner_id } = req.user;
    const { name, image_url } = req.body;

    const createCategory = container.resolve(CreateCategoryService);

    const category = await createCategory.execute({
      name,
      image_url,
    });

    return res.json(category);
  }

  public async findAll(req: Request, res: Response): Promise<Response> {
    const findAllCategories = container.resolve(ListAllCategories);

    const foundCategories = await findAllCategories.execute();

    return res.json(foundCategories);
  }
}
