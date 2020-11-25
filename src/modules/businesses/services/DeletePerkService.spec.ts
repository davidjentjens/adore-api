import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeBusinessRepository from '../repositories/fakes/FakeBusinessRepository';
import FakeTierRepository from '../repositories/fakes/FakeTierRepository';
import FakePerksRepository from '../repositories/fakes/FakePerksRepository';

import DeletePerkService from './DeletePerkService';

let fakeUsersRepository: FakeUsersRepository;
let fakeBusinessRepository: FakeBusinessRepository;
let fakeTierRepository: FakeTierRepository;
let fakePerksRepository: FakePerksRepository;

let deletePerk: DeletePerkService;

describe('CreatePerk', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeBusinessRepository = new FakeBusinessRepository();
    fakeTierRepository = new FakeTierRepository();
    fakePerksRepository = new FakePerksRepository();

    deletePerk = new DeletePerkService(
      fakeUsersRepository,
      fakeTierRepository,
      fakePerksRepository,
    );
  });

  it('should be able to delete a perk', async () => {
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

    const perk = await fakePerksRepository.create({
      title: 'Vantagem Teste',
      desc: 'Descrição Teste.',
      image_url: 'http://image-url.com',
      tier_id: tier.id,
    });

    await deletePerk.execute({
      client_id: owner.id,
      perk_id: perk.id,
    });

    const perksInTier = await fakePerksRepository.findByTier(tier.id);

    expect(perksInTier.length).toEqual(0);
  });

  it('should not be able to delete a non-existant perk', async () => {
    const owner = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(
      deletePerk.execute({
        client_id: owner.id,
        perk_id: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to delete a perk through a non-existant user', async () => {
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

    const perk = await fakePerksRepository.create({
      title: 'Vantagem Teste',
      desc: 'Descrição Teste.',
      image_url: 'http://image-url.com',
      tier_id: tier.id,
    });

    expect(
      deletePerk.execute({
        client_id: '123',
        perk_id: perk.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to delete a perk with a non-existant tier', async () => {
    const client = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const perk = await fakePerksRepository.create({
      title: 'Vantagem Teste',
      desc: 'Descrição Teste.',
      image_url: 'http://image-url.com',
      tier_id: '123',
    });

    expect(
      deletePerk.execute({
        client_id: client.id,
        perk_id: perk.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to delete a perk if client is not the owner of the business', async () => {
    const owner = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const notOwner = await fakeUsersRepository.create({
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

    const perk = await fakePerksRepository.create({
      title: 'Vantagem Teste',
      desc: 'Descrição Teste.',
      image_url: 'http://image-url.com',
      tier_id: tier.id,
    });

    expect(
      deletePerk.execute({
        client_id: notOwner.id,
        perk_id: perk.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
