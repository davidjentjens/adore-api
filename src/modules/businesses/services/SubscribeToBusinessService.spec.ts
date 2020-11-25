import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeBusinessRepository from '../repositories/fakes/FakeBusinessRepository';
import FakeTierRepository from '../repositories/fakes/FakeTierRepository';
import FakeBusinessClientRepository from '../repositories/fakes/FakeBusinessClientRepository';

import SubscribeToBusinessService from './SubscribeToBusinessService';

let fakeBusinessRepository: FakeBusinessRepository;

let fakeUsersRepository: FakeUsersRepository;
let fakeTierRepository: FakeTierRepository;
let fakeBusinessClientRepository: FakeBusinessClientRepository;

let subscribeToBusiness: SubscribeToBusinessService;

describe('SubscribeToBusiness', () => {
  beforeEach(() => {
    fakeBusinessRepository = new FakeBusinessRepository();

    fakeUsersRepository = new FakeUsersRepository();
    fakeTierRepository = new FakeTierRepository();
    fakeBusinessClientRepository = new FakeBusinessClientRepository();

    subscribeToBusiness = new SubscribeToBusinessService(
      fakeUsersRepository,
      fakeTierRepository,
      fakeBusinessClientRepository,
    );
  });

  it('should be able to create a new subscription', async () => {
    const client = await fakeUsersRepository.create({
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
      owner_id: '123',
    });

    const tier = await fakeTierRepository.create({
      name: 'Tier Teste',
      business_id: business.id,
      desc: '',
      image_url: 'http://image-url.com',
      value: 9999,
      rank: 1,
      business,
    });

    const subscription = await subscribeToBusiness.execute({
      client_id: client.id,
      tier_id: tier.id,
    });

    expect(subscription).toHaveProperty('id');
  });

  it('should not be able to subscribe to a new tier with a non-existant user', async () => {
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
      name: 'Tier Teste 1',
      business_id: business.id,
      desc: '',
      image_url: 'http://image-url.com',
      value: 9999,
      rank: 1,
      business,
    });

    expect(
      subscribeToBusiness.execute({
        client_id: '123',
        tier_id: tier.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to subscribe to a new tier with a non-existant tier', async () => {
    const client = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(
      subscribeToBusiness.execute({
        client_id: client.id,
        tier_id: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to subscribe to same tier twice', async () => {
    const client = await fakeUsersRepository.create({
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
      owner_id: '123',
    });

    const tier = await fakeTierRepository.create({
      name: 'Tier Teste 1',
      business_id: business.id,
      desc: '',
      image_url: 'http://image-url.com',
      value: 9999,
      rank: 1,
      business,
    });

    await subscribeToBusiness.execute({
      client_id: client.id,
      tier_id: tier.id,
    });

    expect(
      subscribeToBusiness.execute({
        client_id: client.id,
        tier_id: tier.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should remove previous subscription if subscribing to a new tier on same business', async () => {
    const client = await fakeUsersRepository.create({
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
      owner_id: '123',
    });

    const tier1 = await fakeTierRepository.create({
      name: 'Tier Teste 1',
      business_id: business.id,
      desc: '',
      image_url: 'http://image-url.com',
      value: 9999,
      rank: 1,
      business,
    });

    const tier2 = await fakeTierRepository.create({
      name: 'Tier Teste 2',
      business_id: business.id,
      desc: '',
      image_url: 'http://image-url.com',
      value: 9999,
      rank: 1,
      business,
    });

    await subscribeToBusiness.execute({
      client_id: client.id,
      tier_id: tier1.id,
    });

    await subscribeToBusiness.execute({
      client_id: client.id,
      tier_id: tier2.id,
    });

    const subscriptions = await fakeBusinessClientRepository.findSubscribed(
      client.id,
    );

    expect(subscriptions.length).toEqual(1);
    expect(subscriptions[0].tier_id).toEqual(tier2.id);
  });
});
