import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeLikesRepository from '../repositories/fakes/FakeLikesRepository';
import FakeBusinessPostsRepository from '../repositories/fakes/FakeBusinessPostsRepository';

import ListBusinessPostsService from './ListBusinessPostsService';

let fakeUsersRepository: FakeUsersRepository;
let fakeLikesRepository: FakeLikesRepository;
let fakeBusinessPostsRepository: FakeBusinessPostsRepository;

let listBusinessPosts: ListBusinessPostsService;

describe('ListBusinessPostsService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeLikesRepository = new FakeLikesRepository();
    fakeBusinessPostsRepository = new FakeBusinessPostsRepository();

    listBusinessPosts = new ListBusinessPostsService(
      fakeLikesRepository,
      fakeBusinessPostsRepository,
    );
  });

  it('should be able to list all business posts', async () => {
    const client = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await fakeBusinessPostsRepository.create({
      business_id: 'fake_id',
      desc: 'Descrição teste.',
      image_url: 'http://image-url.com',
      owner_id: '123',
      short_desc: 'Teste.',
      title: 'Postagem teste',
    });

    const businessPosts = await listBusinessPosts.execute({
      client_id: client.id,
    });

    expect(businessPosts.length).toEqual(1);
  });

  it('should be able to show a user if they liked a post from the list', async () => {
    const businessPost = await fakeBusinessPostsRepository.create({
      business_id: 'fake_id',
      desc: 'Descrição teste.',
      image_url: 'http://image-url.com',
      owner_id: '123',
      short_desc: 'Teste.',
      title: 'Postagem teste',
    });

    await fakeBusinessPostsRepository.create({
      business_id: 'fake_id',
      desc: 'Descrição teste 2.',
      image_url: 'http://image-url.com',
      owner_id: '123',
      short_desc: 'Teste 2.',
      title: 'Postagem teste 2',
    });

    const client = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await fakeLikesRepository.create({
      business_post_id: businessPost.id,
      client_id: client.id,
    });

    const businessPosts = await listBusinessPosts.execute({
      client_id: client.id,
    });

    expect(businessPosts[0].liked).toEqual(true);
  });
});
