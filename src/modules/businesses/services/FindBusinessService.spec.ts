import AppError from '@shared/errors/AppError';

import FakeBusinessRepository from '../repositories/fakes/FakeBusinessRepository';

import FindBusinessService from './FindBusinessService';

let fakeBusinessRepository: FakeBusinessRepository;

let findBusiness: FindBusinessService;

describe('DeleteBusiness', () => {
  beforeEach(() => {
    fakeBusinessRepository = new FakeBusinessRepository();

    findBusiness = new FindBusinessService(fakeBusinessRepository);
  });

  it('should be able to find a business', async () => {
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

    const foundBusiness = await findBusiness.execute({
      business_id: business.id,
    });

    expect(foundBusiness).toHaveProperty('id');
  });

  it('should not be able to find a non-existant business', async () => {
    expect(
      findBusiness.execute({
        business_id: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
