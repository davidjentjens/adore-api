import FakeCategoriesRepository from '../repositories/fakes/FakeCategoriesRepository';

import ListAllCategoriesService from './ListAllCategoriesService';

let fakeCategoriesRepository: FakeCategoriesRepository;

let listAllCategories: ListAllCategoriesService;

describe('ListAllCategories', () => {
  beforeEach(() => {
    fakeCategoriesRepository = new FakeCategoriesRepository();

    listAllCategories = new ListAllCategoriesService(fakeCategoriesRepository);
  });

  it('should be able to list all categories', async () => {
    await fakeCategoriesRepository.create({
      user_id: 'test_id',
      name: 'Categoria Teste',
      image_url: 'http://image-url.com',
    });

    const categories = await listAllCategories.execute();

    expect(categories.length).toEqual(1);
  });
});
