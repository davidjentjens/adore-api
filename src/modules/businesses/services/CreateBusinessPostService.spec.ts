import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeBusinessPostsRepository from '../repositories/fakes/FakeBusinessPostsRepository';
import FakeBusinessRepository from '../repositories/fakes/FakeBusinessRepository';

import CreateBusinessPostService from './CreateBusinessPostService';

let fakeUsersRepository: FakeUsersRepository;
let fakeBusinessPostsRepository: FakeBusinessPostsRepository;
let fakeBusinessRepository: FakeBusinessRepository;

let createBusinessPost: CreateBusinessPostService;

describe('CreateBusinessPost', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeBusinessRepository = new FakeBusinessRepository();
    fakeBusinessPostsRepository = new FakeBusinessPostsRepository();

    createBusinessPost = new CreateBusinessPostService(
      fakeUsersRepository,
      fakeBusinessRepository,
      fakeBusinessPostsRepository,
    );
  });

  it('should be able to create a new business post', async () => {
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

    const businessPost = await createBusinessPost.execute({
      business_id: business.id,
      desc: 'Descrição teste.',
      image_url: 'http://image-url.com',
      owner_id: owner.id,
      short_desc: 'Teste.',
      title: 'Postagem teste',
    });

    expect(businessPost).toHaveProperty('id');
  });

  it('should not be able to create a new business post with a non-existant owner', async () => {
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

    expect(
      createBusinessPost.execute({
        business_id: business.id,
        desc: 'Descrição teste.',
        image_url: 'http://image-url.com',
        owner_id: '123',
        short_desc: 'Teste.',
        title: 'Postagem teste',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new business post with a non-existant business', async () => {
    const owner = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(
      createBusinessPost.execute({
        business_id: '123',
        desc: 'Descrição teste.',
        image_url: 'http://image-url.com',
        owner_id: owner.id,
        short_desc: 'Teste.',
        title: 'Postagem teste',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new business post with a user that does not own the business', async () => {
    const owner = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const notOwner = await fakeUsersRepository.create({
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

    expect(
      createBusinessPost.execute({
        business_id: business.id,
        desc: 'Descrição teste.',
        image_url: 'http://image-url.com',
        owner_id: notOwner.id,
        short_desc: 'Teste.',
        title: 'Postagem teste',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
