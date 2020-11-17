import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeBusinessRepository from '../repositories/fakes/FakeBusinessRepository';
import FakeTierRepository from '../repositories/fakes/FakeTierRepository';
import FakePerksRepository from '../repositories/fakes/FakePerksRepository';

import CreatePerkService from './CreatePerkService';

let fakeUsersRepository: FakeUsersRepository;
let fakeBusinessRepository: FakeBusinessRepository;
let fakeTierRepository: FakeTierRepository;
let fakePerksRepository: FakePerksRepository;

let createPerk: CreatePerkService;

describe('CreatePerk', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeBusinessRepository = new FakeBusinessRepository();
    fakeTierRepository = new FakeTierRepository();
    fakePerksRepository = new FakePerksRepository();

    createPerk = new CreatePerkService(
      fakeUsersRepository,
      fakeTierRepository,
      fakePerksRepository,
    );
  });

  it('should be able to create a new perk', async () => {
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

    const tier = await fakeTierRepository.create({
      name: 'Tier Teste',
      business_id: business.id,
      business,
      desc: '',
      image_url: 'http://image-url.com',
      value: 9999,
      rank: 1,
    });

    const perk = await createPerk.execute({
      title: 'Vantagem Teste',
      client_id: owner.id,
      desc: 'Descrição Teste.',
      image_url: 'http://image-url.com',
      tier_id: tier.id,
    });

    expect(perk).toHaveProperty('id');
  });

  it('should not be able to create a new perk if tier does not exist', async () => {
    expect(
      createPerk.execute({
        title: 'Vantagem Teste',
        client_id: '123',
        desc: 'Descrição Teste.',
        image_url: 'http://image-url.com',
        tier_id: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new perk if client is not the owner of the business', async () => {
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

    const tier = await fakeTierRepository.create({
      name: 'Tier Teste',
      business_id: business.id,
      business,
      desc: '',
      image_url: 'http://image-url.com',
      value: 9999,
      rank: 1,
    });

    expect(
      createPerk.execute({
        title: 'Vantagem Teste',
        client_id: client.id,
        desc: 'Descrição Teste.',
        image_url: 'http://image-url.com',
        tier_id: tier.id,
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

    const tier = await fakeTierRepository.create({
      name: 'Tier Teste',
      business_id: business.id,
      business,
      desc: '',
      image_url: 'http://image-url.com',
      value: 9999,
      rank: 1,
    });

    expect(
      createPerk.execute({
        title: 'Vantagem Teste',
        client_id: '123',
        desc: 'Descrição Teste.',
        image_url: 'http://image-url.com',
        tier_id: tier.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
