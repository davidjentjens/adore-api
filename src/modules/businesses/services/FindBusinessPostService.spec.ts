import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeLikesRepository from '../repositories/fakes/FakeLikesRepository';
import FakeBusinessRepository from '../repositories/fakes/FakeBusinessRepository';
import FakeBusinessPostsRepository from '../repositories/fakes/FakeBusinessPostsRepository';

import FindBusinessPostService from './FindBusinessPostService';

let fakeUsersRepository: FakeUsersRepository;
let fakeLikesRepository: FakeLikesRepository;
let fakeBusinessRepository: FakeBusinessRepository;
let fakeBusinessPostsRepository: FakeBusinessPostsRepository;

let findBusinessPost: FindBusinessPostService;

describe('FindBusinessPost', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeLikesRepository = new FakeLikesRepository();
    fakeBusinessRepository = new FakeBusinessRepository();
    fakeBusinessPostsRepository = new FakeBusinessPostsRepository();

    findBusinessPost = new FindBusinessPostService(
      fakeUsersRepository,
      fakeLikesRepository,
      fakeBusinessPostsRepository,
    );
  });

  it('should be able to find a business post', async () => {
    const client = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const businessPost = await fakeBusinessPostsRepository.create({
      business_id: '123',
      desc: 'Descrição teste.',
      image_url: 'http://image-url.com',
      owner_id: '123',
      short_desc: 'Teste.',
      title: 'Postagem teste',
    });

    const foundBusinessPost = await findBusinessPost.execute({
      business_post_id: businessPost.id,
      client_id: client.id,
    });

    expect(foundBusinessPost).toHaveProperty('id');
  });

  it('should not be able to find a business post through a non-existant user', async () => {
    const businessPost = await fakeBusinessPostsRepository.create({
      business_id: '123',
      desc: 'Descrição teste.',
      image_url: 'http://image-url.com',
      owner_id: '123',
      short_desc: 'Teste.',
      title: 'Postagem teste',
    });

    expect(
      findBusinessPost.execute({
        business_post_id: businessPost.id,
        client_id: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to find a non-existant business post', async () => {
    const client = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(
      findBusinessPost.execute({
        business_post_id: '123',
        client_id: client.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to get like status from post', async () => {
    const client = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const businessPost = await fakeBusinessPostsRepository.create({
      business_id: '123',
      desc: 'Descrição teste.',
      image_url: 'http://image-url.com',
      owner_id: '123',
      short_desc: 'Teste.',
      title: 'Postagem teste',
    });

    await fakeLikesRepository.create({
      business_post_id: businessPost.id,
      client_id: client.id,
    });

    const foundBusinessPost = await findBusinessPost.execute({
      business_post_id: businessPost.id,
      client_id: client.id,
    });

    expect(foundBusinessPost.liked).toEqual(true);
  });
});
