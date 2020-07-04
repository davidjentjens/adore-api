import Category from '../infra/typeorm/entities/Category';

interface ICategory {
  name: string;
  image_url: string;
}

export default interface IBusinessClientRepository {
  create(data: ICategory): Promise<Category>;
  findAll(): Promise<Category[]>;
}
