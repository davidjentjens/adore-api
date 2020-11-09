import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeTierRepository from '../repositories/fakes/FakeTierRepository';
import FakePerksRepository from '../repositories/fakes/FakePerksRepository';

import CreatePerkService from './CreatePerkService';

let fakeUsersRepository: FakeUsersRepository;
let fakeTierRepository: FakeTierRepository;
let fakePerksRepository: FakePerksRepository;

let createPerk: CreatePerkService;

describe('CreatePerk', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeTierRepository = new FakeTierRepository();
    fakePerksRepository = new FakePerksRepository();

    createPerk = new CreatePerkService(fakeTierRepository, fakePerksRepository);
  });

  it('should be able to create a new perk', async () => {
    const owner = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const tier = await fakeTierRepository.create({
      name: 'Tier Teste',
      business_id: '123',
      desc: '',
      image_url: '',
      owner_id: owner.id,
      value: 9999,
      rank: 1,
    });

    const perk = await createPerk.execute({
      title: 'Vantagem Teste',
      client_id: '123',
      desc: 'Descrição Teste.',
      image_url: 'http://image-url.com',
      tier_id: tier.id,
    });

    expect(perk).toHaveProperty('id');
  });
});
