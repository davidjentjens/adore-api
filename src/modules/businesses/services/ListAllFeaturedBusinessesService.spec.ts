import FakeBusinessRepository from '../repositories/fakes/FakeBusinessRepository';

import ListAllFeaturedBusinessesService from './ListAllFeaturedBusinessesService';

let fakeBusinessRepository: FakeBusinessRepository;

let listAllFeaturedBusinesses: ListAllFeaturedBusinessesService;

describe('ListAllFeaturedBusinessesService', () => {
  beforeEach(() => {
    fakeBusinessRepository = new FakeBusinessRepository();

    listAllFeaturedBusinesses = new ListAllFeaturedBusinessesService(
      fakeBusinessRepository,
    );
  });

  it('should be able to list all featured businesses', async () => {
    await fakeBusinessRepository.create({
      name: 'Restaurante do João',
      desc: 'Descrição teste.',
      latitude: 0,
      longitude: 0,
      email: 'joao@contato.com.br',
      whatsapp: '123456789',
      category_id: 'id_test',
      image_url: 'http://image-url.com',
      logo_url: 'http://logo-url.com',
      zone: 'Flamengo',
      featured: true,
      owner_id: 'id_test',
    });

    await fakeBusinessRepository.create({
      name: 'Restaurante do Fred',
      desc: 'Descrição teste.',
      latitude: 0,
      longitude: 0,
      email: 'fred@contato.com.br',
      whatsapp: '123456789',
      category_id: 'id_test',
      image_url: 'http://image-url.com',
      logo_url: 'http://logo-url.com',
      zone: 'Flamengo',
      featured: false,
      owner_id: 'id_test',
    });

    const businesses = await listAllFeaturedBusinesses.execute();

    expect(businesses.length).toEqual(1);
    expect(businesses[0].featured).toEqual(true);
  });
});
