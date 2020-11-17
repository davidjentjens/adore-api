import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeBusinessRepository from '../repositories/fakes/FakeBusinessRepository';
import FakeTierRepository from '../repositories/fakes/FakeTierRepository';

import CreateTierService from './CreateTierService';

let fakeUsersRepository: FakeUsersRepository;
let fakeBusinessRepository: FakeBusinessRepository;
let fakeTierRepository: FakeTierRepository;

let createTier: CreateTierService;

describe('CreateTier', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeBusinessRepository = new FakeBusinessRepository();
    fakeTierRepository = new FakeTierRepository();

    createTier = new CreateTierService(
      fakeUsersRepository,
      fakeBusinessRepository,
      fakeTierRepository,
    );
  });

  it('should be able to create a new tier', async () => {
    const owner = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const business = await fakeBusinessRepository.create({
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
    });

    const tier = await createTier.execute({
      name: 'Tier Teste',
      business_id: business.id,
      desc: '',
      image_url: 'http://image-url.com',
      value: 9999,
      rank: 1,
      owner_id: owner.id,
    });

    expect(tier).toHaveProperty('id');
  });

  it('should not be able to create a new tier with the same name as another', async () => {
    const owner = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const business = await fakeBusinessRepository.create({
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
    });

    await createTier.execute({
      name: 'Tier Teste',
      business_id: business.id,
      desc: '',
      image_url: 'http://image-url.com',
      value: 9999,
      rank: 1,
      owner_id: owner.id,
    });

    expect(
      createTier.execute({
        name: 'Tier Teste',
        business_id: business.id,
        desc: '',
        image_url: 'http://image-url.com',
        value: 9999,
        rank: 1,
        owner_id: owner.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new tier if business does not exist', async () => {
    const owner = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(
      createTier.execute({
        name: 'Tier Teste',
        business_id: '123',
        desc: '',
        image_url: 'http://image-url.com',
        value: 9999,
        rank: 1,
        owner_id: owner.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new tier if client is not the owner of the business', async () => {
    const owner = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const client = await fakeUsersRepository.create({
      name: 'Fred Doe',
      email: 'freddoe@example.com',
      password: '123456',
    });

    const business = await fakeBusinessRepository.create({
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
    });

    expect(
      createTier.execute({
        name: 'Tier Teste',
        business_id: business.id,
        owner_id: client.id,
        desc: '',
        image_url: 'http://image-url.com',
        value: 9999,
        rank: 1,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new category with a non-existant user', async () => {
    const business = await fakeBusinessRepository.create({
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
      owner_id: '123',
    });

    expect(
      createTier.execute({
        name: 'Tier Teste',
        business_id: business.id,
        owner_id: '123',
        desc: '',
        image_url: 'http://image-url.com',
        value: 9999,
        rank: 1,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
