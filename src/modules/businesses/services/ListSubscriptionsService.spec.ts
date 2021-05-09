import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeBusinessClientRepository from '../repositories/fakes/FakeBusinessClientRepository';

import ListSubscriptionsService from './ListSubscriptionsService';

let fakeUsersRepository: FakeUsersRepository;
let fakeBusinessClientRepository: FakeBusinessClientRepository;

let listSubscriptions: ListSubscriptionsService;

describe('ListSubscriptions', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeBusinessClientRepository = new FakeBusinessClientRepository();

    listSubscriptions = new ListSubscriptionsService(
      fakeUsersRepository,
      fakeBusinessClientRepository,
    );
  });

  it('should be able to list subscriptions from a client', async () => {
    const client = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await fakeBusinessClientRepository.create({
      client_id: client.id,
      tier_id: 'tier1_id',
    });

    await fakeBusinessClientRepository.create({
      client_id: client.id,
      tier_id: 'tier2_id',
    });

    const subscriptions = await listSubscriptions.execute({
      client_id: client.id,
    });

    expect(subscriptions.length).toEqual(2);
    expect(subscriptions[0].client_id).toEqual(client.id);
    expect(subscriptions[1].client_id).toEqual(client.id);
  });

  it('should not be able to list subscriptions from a non-existant client', async () => {
    expect(
      listSubscriptions.execute({
        client_id: 'fake_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
