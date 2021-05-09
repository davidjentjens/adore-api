import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCategoriesRepository from '../repositories/fakes/FakeCategoriesRepository';
import FakeBusinessRepository from '../repositories/fakes/FakeBusinessRepository';

import DeleteBusinessService from './DeleteBusinessService';

let fakeUsersRepository: FakeUsersRepository;
let fakeCategoriesRepository: FakeCategoriesRepository;
let fakeBusinessRepository: FakeBusinessRepository;

let deleteBusiness: DeleteBusinessService;

describe('DeleteBusiness', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCategoriesRepository = new FakeCategoriesRepository();
    fakeBusinessRepository = new FakeBusinessRepository();

    deleteBusiness = new DeleteBusinessService(
      fakeUsersRepository,
      fakeBusinessRepository,
    );
  });

  it('should be able to delete a business', async () => {
    const owner = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const category = await fakeCategoriesRepository.create({
      user_id: 'admin_id',
      name: 'Categoria Teste',
      image_url: 'http://image-url.com',
    });

    const business = await fakeBusinessRepository.create({
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

    await deleteBusiness.execute({
      business_id: business.id,
      owner_id: owner.id,
    });

    const businesses = await fakeBusinessRepository.findAll();

    expect(businesses.length).toEqual(0);
  });

  it('should not be able to delete a non-existant business', async () => {
    const client = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(
      deleteBusiness.execute({
        business_id: '123',
        owner_id: client.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to delete a business through a non-existant user', async () => {
    const owner = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const category = await fakeCategoriesRepository.create({
      user_id: 'admin_id',
      name: 'Categoria Teste',
      image_url: 'http://image-url.com',
    });

    const business = await fakeBusinessRepository.create({
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
      deleteBusiness.execute({
        business_id: business.id,
        owner_id: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to delete a business through a user who is not the owner', async () => {
    const owner = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const notOwner = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const category = await fakeCategoriesRepository.create({
      user_id: 'admin_id',
      name: 'Categoria Teste',
      image_url: 'http://image-url.com',
    });

    const business = await fakeBusinessRepository.create({
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
      deleteBusiness.execute({
        business_id: business.id,
        owner_id: notOwner.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
