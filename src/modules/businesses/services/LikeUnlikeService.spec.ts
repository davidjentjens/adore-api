import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeBusinessPostsRepository from '../repositories/fakes/FakeBusinessPostsRepository';
import FakeLikesRepository from '../repositories/fakes/FakeLikesRepository';

import LikeUnlikeService from './LikeUnlikeService';

let fakeUsersRepository: FakeUsersRepository;
let fakeBusinessPostsRepository: FakeBusinessPostsRepository;
let fakeLikesRepository: FakeLikesRepository;

let likeUnlike: LikeUnlikeService;

describe('LikeUnlike', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeBusinessPostsRepository = new FakeBusinessPostsRepository();
    fakeLikesRepository = new FakeLikesRepository();

    likeUnlike = new LikeUnlikeService(
      fakeUsersRepository,
      fakeBusinessPostsRepository,
      fakeLikesRepository,
    );
  });

  it('should be able to create a new like', async () => {
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

    const like = await likeUnlike.execute({
      client_id: client.id,
      business_post_id: businessPost.id,
    });

    expect(like).toHaveProperty('id');
  });

  it('should not be able to create a new like with a non-existant user', async () => {
    const businessPost = await fakeBusinessPostsRepository.create({
      business_id: '123',
      desc: 'Descrição teste.',
      image_url: 'http://image-url.com',
      owner_id: '123',
      short_desc: 'Teste.',
      title: 'Postagem teste',
    });

    expect(
      likeUnlike.execute({
        client_id: '123',
        business_post_id: businessPost.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new like on a non-existant post', async () => {
    const client = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(
      likeUnlike.execute({
        client_id: client.id,
        business_post_id: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete the like if the user already previously liked the post', async () => {
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

    await likeUnlike.execute({
      client_id: client.id,
      business_post_id: businessPost.id,
    });

    await likeUnlike.execute({
      client_id: client.id,
      business_post_id: businessPost.id,
    });

    const likesInPost = await fakeLikesRepository.findAllInPost(
      businessPost.id,
    );

    expect(likesInPost.length).toEqual(0);
  });
});
