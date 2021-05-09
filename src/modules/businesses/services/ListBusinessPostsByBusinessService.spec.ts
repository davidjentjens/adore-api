import AppError from '@shared/errors/AppError';

import FakeBusinessRepository from '../repositories/fakes/FakeBusinessRepository';
import FakeBusinessPostsRepository from '../repositories/fakes/FakeBusinessPostsRepository';

import ListBusinessPostsByBusinessService from './ListBusinessPostsByBusinessService';

let fakeBusinessRepository: FakeBusinessRepository;
let fakeBusinessPostsRepository: FakeBusinessPostsRepository;

let listBusinessPostsByBusiness: ListBusinessPostsByBusinessService;

describe('ListBusinessPostsByBusiness', () => {
  beforeEach(() => {
    fakeBusinessRepository = new FakeBusinessRepository();
    fakeBusinessPostsRepository = new FakeBusinessPostsRepository();

    listBusinessPostsByBusiness = new ListBusinessPostsByBusinessService(
      fakeBusinessRepository,
      fakeBusinessPostsRepository,
    );
  });

  it('should be able to list all business posts of business', async () => {
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

    await fakeBusinessPostsRepository.create({
      business_id: business.id,
      desc: 'Descrição teste.',
      image_url: 'http://image-url.com',
      owner_id: '123',
      short_desc: 'Teste.',
      title: 'Postagem teste',
    });

    await fakeBusinessPostsRepository.create({
      business_id: business.id,
      desc: 'Descrição teste.',
      image_url: 'http://image-url.com',
      owner_id: '123',
      short_desc: 'Teste.',
      title: 'Postagem teste',
    });

    await fakeBusinessPostsRepository.create({
      business_id: 'other_business_id',
      desc: 'Descrição teste.',
      image_url: 'http://image-url.com',
      owner_id: '123',
      short_desc: 'Teste.',
      title: 'Postagem teste',
    });

    const foundBusinessPosts = await listBusinessPostsByBusiness.execute({
      business_id: business.id,
    });

    expect(foundBusinessPosts.length).toEqual(2);
    expect(foundBusinessPosts[0].business_id).toEqual(business.id);
    expect(foundBusinessPosts[1].business_id).toEqual(business.id);
  });

  it('should not be able to find a business posts of a non-existant business', async () => {
    await fakeBusinessPostsRepository.create({
      business_id: 'fake_id',
      desc: 'Descrição teste.',
      image_url: 'http://image-url.com',
      owner_id: '123',
      short_desc: 'Teste.',
      title: 'Postagem teste',
    });

    expect(
      listBusinessPostsByBusiness.execute({
        business_id: 'fake_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
