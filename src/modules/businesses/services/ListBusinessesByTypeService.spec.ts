import AppError from '@shared/errors/AppError';

import FakeBusinessRepository from '../repositories/fakes/FakeBusinessRepository';
import FakeCategoriesRepository from '../repositories/fakes/FakeCategoriesRepository';

import ListBusinessesByTypeService from './ListBusinessesByTypeService';

let fakeBusinessRepository: FakeBusinessRepository;
let fakeCategoriesRepository: FakeCategoriesRepository;

let listBusinessesByType: ListBusinessesByTypeService;

describe('ListAllBusinessesByType', () => {
  beforeEach(() => {
    fakeBusinessRepository = new FakeBusinessRepository();
    fakeCategoriesRepository = new FakeCategoriesRepository();

    listBusinessesByType = new ListBusinessesByTypeService(
      fakeBusinessRepository,
      fakeCategoriesRepository,
    );
  });

  it('should be able to list all businesses of a given category', async () => {
    const category = await fakeCategoriesRepository.create({
      user_id: 'owner_id',
      name: 'Categoria Teste',
      image_url: 'http://image-url.com',
    });

    await fakeBusinessRepository.create({
      name: 'Restaurante do João',
      desc: 'Descrição teste.',
      latitude: 0,
      longitude: 0,
      email: 'Joao@contato.com.br',
      whatsapp: '123456789',
      category_id: category.id,
      image_url: 'http://image-url.com',
      logo_url: 'http://logo-url.com',
      zone: 'Flamengo',
      featured: true,
      owner_id: 'id_test',
    });

    await fakeBusinessRepository.create({
      name: 'Restaurante do João',
      desc: 'Descrição teste.',
      latitude: 0,
      longitude: 0,
      email: 'Joao@contato.com.br',
      whatsapp: '123456789',
      category_id: 'other_category_id',
      image_url: 'http://image-url.com',
      logo_url: 'http://logo-url.com',
      zone: 'Flamengo',
      featured: true,
      owner_id: 'id_test',
    });

    const businesses = await listBusinessesByType.execute({
      category_id: category.id,
    });

    expect(businesses.length).toEqual(1);
    expect(businesses[0].category_id).toEqual(category.id);
  });

  it('should not be able to list businesses of a non-existant category', async () => {
    await fakeBusinessRepository.create({
      name: 'Restaurante do João',
      desc: 'Descrição teste.',
      latitude: 0,
      longitude: 0,
      email: 'Joao@contato.com.br',
      whatsapp: '123456789',
      category_id: 'fake_id',
      image_url: 'http://image-url.com',
      logo_url: 'http://logo-url.com',
      zone: 'Flamengo',
      featured: true,
      owner_id: 'id_test',
    });

    await fakeBusinessRepository.create({
      name: 'Restaurante do João',
      desc: 'Descrição teste.',
      latitude: 0,
      longitude: 0,
      email: 'Joao@contato.com.br',
      whatsapp: '123456789',
      category_id: 'fake_id',
      image_url: 'http://image-url.com',
      logo_url: 'http://logo-url.com',
      zone: 'Flamengo',
      featured: true,
      owner_id: 'id_test',
    });

    expect(
      listBusinessesByType.execute({
        category_id: 'fake_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
