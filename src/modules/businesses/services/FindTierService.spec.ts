import AppError from '@shared/errors/AppError';

import FakeBusinessRepository from '../repositories/fakes/FakeBusinessRepository';
import FakeTierRepository from '../repositories/fakes/FakeTierRepository';

import FindTierService from './FindTierService';

let fakeBusinessRepository: FakeBusinessRepository;
let fakeTierRepository: FakeTierRepository;

let findTier: FindTierService;

describe('CreateTier', () => {
  beforeEach(() => {
    fakeBusinessRepository = new FakeBusinessRepository();
    fakeTierRepository = new FakeTierRepository();

    findTier = new FindTierService(fakeTierRepository);
  });

  it('should be able to find a tier', async () => {
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

    const foundTier = await findTier.execute({ tier_id: tier.id });

    expect(foundTier).toHaveProperty('id');
  });

  it('should not be able to find a non-existant tier', async () => {
    expect(findTier.execute({ tier_id: '123' })).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
