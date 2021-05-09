import FakeBusinessRepository from '../repositories/fakes/FakeBusinessRepository';

import ListAllBusinessesService from './ListAllBusinessesService';

let fakeBusinessRepository: FakeBusinessRepository;

let listAllBusinesses: ListAllBusinessesService;

describe('ListAllBusinesses', () => {
  beforeEach(() => {
    fakeBusinessRepository = new FakeBusinessRepository();

    listAllBusinesses = new ListAllBusinessesService(fakeBusinessRepository);
  });

  it('should be able to list all businesses', async () => {
    await fakeBusinessRepository.create({
      name: 'Restaurante do João',
      desc: 'Descrição teste.',
      latitude: 0,
      longitude: 0,
      email: 'Joao@contato.com.br',
      whatsapp: '123456789',
      category_id: 'id_test',
      image_url: 'http://image-url.com',
      logo_url: 'http://logo-url.com',
      zone: 'Flamengo',
      featured: true,
      owner_id: 'id_test',
    });

    const businesses = await listAllBusinesses.execute();

    expect(businesses.length).toEqual(1);
  });
});
