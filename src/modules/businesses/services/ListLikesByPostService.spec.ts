import AppError from '@shared/errors/AppError';

import FakeBusinessPostsRepository from '../repositories/fakes/FakeBusinessPostsRepository';
import FakeLikesRepository from '../repositories/fakes/FakeLikesRepository';

import ListLikesByPostService from './ListLikesByPostService';

let fakeBusinessPostsRepository: FakeBusinessPostsRepository;
let fakeLikesRepository: FakeLikesRepository;

let listLikesByPost: ListLikesByPostService;

describe('ListLikesByPost', () => {
  beforeEach(() => {
    fakeBusinessPostsRepository = new FakeBusinessPostsRepository();
    fakeLikesRepository = new FakeLikesRepository();

    listLikesByPost = new ListLikesByPostService(
      fakeBusinessPostsRepository,
      fakeLikesRepository,
    );
  });

  it('should be able to list likes from a post', async () => {
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
      client_id: 'client1_id',
    });

    await fakeLikesRepository.create({
      business_post_id: businessPost.id,
      client_id: 'client2_id',
    });

    const likes = await listLikesByPost.execute({
      business_post_id: businessPost.id,
    });

    expect(likes.length).toEqual(2);
    expect(likes[0].business_post_id).toEqual(businessPost.id);
    expect(likes[1].business_post_id).toEqual(businessPost.id);
  });

  it('should be able to list likes from non-existant post', async () => {
    expect(
      listLikesByPost.execute({
        business_post_id: 'fake_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
