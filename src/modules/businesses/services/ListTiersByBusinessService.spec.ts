import AppError from '@shared/errors/AppError';

import FakeBusinessRepository from '../repositories/fakes/FakeBusinessRepository';
import FakeTierRepository from '../repositories/fakes/FakeTierRepository';

import ListTiersByBusinessService from './ListTiersByBusinessService';

let fakeBusinessRepository: FakeBusinessRepository;
let fakeTierRepository: FakeTierRepository;

let listTiersByBusiness: ListTiersByBusinessService;

describe('ListTiersByBusiness', () => {
  beforeEach(() => {
    fakeBusinessRepository = new FakeBusinessRepository();
    fakeTierRepository = new FakeTierRepository();

    listTiersByBusiness = new ListTiersByBusinessService(
      fakeBusinessRepository,
      fakeTierRepository,
    );
  });

  it('should be able to list tiers from a business', async () => {
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

    await fakeTierRepository.create({
      name: 'Tier Teste',
      business_id: business.id,
      business,
      desc: '',
      image_url: 'http://image-url.com',
      value: 9999,
      rank: 1,
    });

    await fakeTierRepository.create({
      name: 'Tier Teste 2',
      business_id: business.id,
      business,
      desc: '',
      image_url: 'http://image-url.com',
      value: 9999,
      rank: 1,
    });

    const tiers = await listTiersByBusiness.execute({
      business_id: business.id,
    });

    expect(tiers.length).toEqual(2);
    expect(tiers[0].business_id).toEqual(business.id);
    expect(tiers[1].business_id).toEqual(business.id);
  });

  it('should be able to list tiers from non-existant business', async () => {
    expect(
      listTiersByBusiness.execute({
        business_id: 'fake_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
