import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeBusinessRepository from '../repositories/fakes/FakeBusinessRepository';
import FakeBusinessPostsRepository from '../repositories/fakes/FakeBusinessPostsRepository';

import DeleteBusinessPostService from './DeleteBusinessPostService';

let fakeUsersRepository: FakeUsersRepository;
let fakeBusinessRepository: FakeBusinessRepository;
let fakeBusinessPostsRepository: FakeBusinessPostsRepository;

let deleteBusinessPost: DeleteBusinessPostService;

describe('DeleteBusinessPost', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeBusinessRepository = new FakeBusinessRepository();
    fakeBusinessPostsRepository = new FakeBusinessPostsRepository();

    deleteBusinessPost = new DeleteBusinessPostService(
      fakeUsersRepository,
      fakeBusinessRepository,
      fakeBusinessPostsRepository,
    );
  });

  it('should be able to delete business post', async () => {
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

    const businessPost = await fakeBusinessPostsRepository.create({
      business_id: business.id,
      desc: 'Descrição teste.',
      image_url: 'http://image-url.com',
      owner_id: owner.id,
      short_desc: 'Teste.',
      title: 'Postagem teste',
    });

    await deleteBusinessPost.execute({
      owner_id: owner.id,
      business_post_id: businessPost.id,
    });

    const businessPosts = await fakeBusinessPostsRepository.findAll();

    expect(businessPosts.length).toEqual(0);
  });

  it('should not be able to delete a non-existant business post', async () => {
    const owner = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(
      deleteBusinessPost.execute({
        business_post_id: '123',
        owner_id: owner.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to delete a business post through a non-existant client', async () => {
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

    const businessPost = await fakeBusinessPostsRepository.create({
      business_id: business.id,
      desc: 'Descrição teste.',
      image_url: 'http://image-url.com',
      owner_id: owner.id,
      short_desc: 'Teste.',
      title: 'Postagem teste',
    });

    expect(
      deleteBusinessPost.execute({
        business_post_id: businessPost.id,
        owner_id: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to delete a business post with a non-existant business', async () => {
    const owner = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const businessPost = await fakeBusinessPostsRepository.create({
      business_id: '123',
      desc: 'Descrição teste.',
      image_url: 'http://image-url.com',
      owner_id: owner.id,
      short_desc: 'Teste.',
      title: 'Postagem teste',
    });

    expect(
      deleteBusinessPost.execute({
        business_post_id: businessPost.id,
        owner_id: owner.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to delete a business post with a user that does not own the business', async () => {
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

    const businessPost = await fakeBusinessPostsRepository.create({
      business_id: business.id,
      desc: 'Descrição teste.',
      image_url: 'http://image-url.com',
      owner_id: notOwner.id,
      short_desc: 'Teste.',
      title: 'Postagem teste',
    });

    expect(
      deleteBusinessPost.execute({
        business_post_id: businessPost.id,
        owner_id: notOwner.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
