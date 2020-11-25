import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeBusinessRepository from '../repositories/fakes/FakeBusinessRepository';
import FakeTierRepository from '../repositories/fakes/FakeTierRepository';
import FakeBusinessClientRepository from '../repositories/fakes/FakeBusinessClientRepository';

import UnsubscribeFromBusinessService from './UnsubscribeFromBusinessService';

let fakeBusinessRepository: FakeBusinessRepository;

let fakeUsersRepository: FakeUsersRepository;
let fakeTierRepository: FakeTierRepository;
let fakeBusinessClientRepository: FakeBusinessClientRepository;

let unsubscribeFromBusiness: UnsubscribeFromBusinessService;

describe('UnsubscribeFromBusiness', () => {
  beforeEach(() => {
    fakeBusinessRepository = new FakeBusinessRepository();

    fakeUsersRepository = new FakeUsersRepository();
    fakeTierRepository = new FakeTierRepository();
    fakeBusinessClientRepository = new FakeBusinessClientRepository();

    unsubscribeFromBusiness = new UnsubscribeFromBusinessService(
      fakeUsersRepository,
      fakeBusinessClientRepository,
    );
  });

  it('should be able to unsubscribe from business tier', async () => {
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

    const subscription = await fakeBusinessClientRepository.create({
      client_id: client.id,
      tier_id: tier.id,
    });

    await unsubscribeFromBusiness.execute({
      client_id: client.id,
      subscription_id: subscription.id,
    });

    const subscriptions = await fakeBusinessClientRepository.findSubscribed(
      client.id,
    );

    expect(subscriptions.length).toEqual(0);
  });

  it('should not be able to unsubscribe from a non-existant subscription', async () => {
    const client = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(
      unsubscribeFromBusiness.execute({
        client_id: client.id,
        subscription_id: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to unsubscribe from a subscription if user is not the subscriber', async () => {
    const subscriberClient = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const nonSubscriberClient = await fakeUsersRepository.create({
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

    const subscription = await fakeBusinessClientRepository.create({
      client_id: subscriberClient.id,
      tier_id: tier.id,
    });

    expect(
      unsubscribeFromBusiness.execute({
        client_id: nonSubscriberClient.id,
        subscription_id: subscription.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to unsubscribe from a tier through a non-existant user', async () => {
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

    const subscription = await fakeBusinessClientRepository.create({
      client_id: '123',
      tier_id: tier.id,
    });

    expect(
      unsubscribeFromBusiness.execute({
        client_id: '123',
        subscription_id: subscription.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
