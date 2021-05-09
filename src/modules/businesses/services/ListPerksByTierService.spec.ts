import AppError from '@shared/errors/AppError';

import FakeBusinessRepository from '../repositories/fakes/FakeBusinessRepository';
import FakeTierRepository from '../repositories/fakes/FakeTierRepository';
import FakePerksRepository from '../repositories/fakes/FakePerksRepository';

import ListPerksByTierService from './ListPerksByTierService';

let fakeBusinessRepository: FakeBusinessRepository;
let fakeTierRepository: FakeTierRepository;
let fakePerksRepository: FakePerksRepository;

let listPerksByTier: ListPerksByTierService;

describe('ListPerksByTier', () => {
  beforeEach(() => {
    fakeBusinessRepository = new FakeBusinessRepository();
    fakeTierRepository = new FakeTierRepository();
    fakePerksRepository = new FakePerksRepository();

    listPerksByTier = new ListPerksByTierService(
      fakeTierRepository,
      fakePerksRepository,
    );
  });

  it('should be able to list perks from a tier', async () => {
    const business = await fakeBusinessRepository.create({
      name: 'Restaurante do João',
      desc: 'Descrição teste.',
      latitude: 0,
      longitude: 0,
      email: 'Joao@contato.com.br',
      whatsapp: '123456789',
      category_id: 'category_id',
      image_url: 'http://image-url.com',
      logo_url: 'http://logo-url.com',
      zone: 'Flamengo',
      featured: true,
      owner_id: 'owner_id',
    });

    const tier = await fakeTierRepository.create({
      name: 'Tier Teste',
      business_id: 'business_id',
      business,
      desc: '',
      image_url: 'http://image-url.com',
      value: 9999,
      rank: 1,
    });

    await fakePerksRepository.create({
      title: 'Vantagem Teste',
      desc: 'Descrição Teste.',
      image_url: 'http://image-url.com',
      tier_id: tier.id,
    });

    await fakePerksRepository.create({
      title: 'Vantagem Teste 2',
      desc: 'Descrição Teste 2.',
      image_url: 'http://image-url.com',
      tier_id: tier.id,
    });

    const perks = await listPerksByTier.execute({
      tier_id: tier.id,
    });

    expect(perks.length).toEqual(2);
    expect(perks[0].tier_id).toEqual(tier.id);
    expect(perks[1].tier_id).toEqual(tier.id);
  });

  it('should be able to list perks from non-existant tier', async () => {
    expect(
      listPerksByTier.execute({
        tier_id: 'fake_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
