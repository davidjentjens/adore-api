import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCategoryService from '@modules/businesses/services/CreateCategoryService';
import ListAllCategoriesService from '@modules/businesses/services/ListAllCategoriesService';

export default class CategoryController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { id: owner_id } = req.user;
    const { name, image_url } = req.body;

    const createCategory = container.resolve(CreateCategoryService);

    const category = await createCategory.execute({
      user_id: owner_id,
      name,
      image_url,
    });

    return res.json(category);
  }

  public async findAll(req: Request, res: Response): Promise<Response> {
    const listAllCategories = container.resolve(ListAllCategoriesService);

    const foundCategories = await listAllCategories.execute();

    return res.json(foundCategories);
  }
}
