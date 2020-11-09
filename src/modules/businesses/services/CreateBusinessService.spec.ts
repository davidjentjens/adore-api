import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCategoriesRepository from '../repositories/fakes/FakeCategoriesRepository';
import FakeBusinessRepository from '../repositories/fakes/FakeBusinessRepository';

import CreateBusinessService from './CreateBusinessService';

let fakeUsersRepository: FakeUsersRepository;
let fakeCategoriesRepository: FakeCategoriesRepository;
let fakeBusinessRepository: FakeBusinessRepository;

let createBusiness: CreateBusinessService;

describe('CreateBusiness', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCategoriesRepository = new FakeCategoriesRepository();
    fakeBusinessRepository = new FakeBusinessRepository();

    createBusiness = new CreateBusinessService(
      fakeUsersRepository,
      fakeCategoriesRepository,
      fakeBusinessRepository,
    );
  });

  it('should be able to create a new business', async () => {
    const owner = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const category = await fakeCategoriesRepository.create({
      name: 'Categoria Teste',
      image_url: 'http://image-url.com',
    });

    const business = await createBusiness.execute({
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
      owner_id: owner.id,
    });

    expect(business).toHaveProperty('id');
  });

  it('should not be able to create a new business with a non-existant owner', async () => {
    const category = await fakeCategoriesRepository.create({
      name: 'Categoria Teste',
      image_url: 'http://image-url.com',
    });

    expect(
      createBusiness.execute({
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
        owner_id: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new business with a non-existant category', async () => {
    const owner = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(
      createBusiness.execute({
        name: 'Restaurante do João',
        desc: 'Descrição teste.',
        latitude: 0,
        longitude: 0,
        email: 'Joao@contato.com.br',
        whatsapp: '123456789',
        category_id: '123',
        image_url: 'http://image-url.com',
        logo_url: 'http://logo-url.com',
        zone: 'Flamengo',
        featured: true,
        owner_id: owner.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new business with same name as another', async () => {
    const owner = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const category = await fakeCategoriesRepository.create({
      name: 'Categoria Teste',
      image_url: 'http://image-url.com',
    });

    await createBusiness.execute({
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
      owner_id: owner.id,
    });

    expect(
      createBusiness.execute({
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
        owner_id: owner.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
