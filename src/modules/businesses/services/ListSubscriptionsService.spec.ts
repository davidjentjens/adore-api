import FakeBusinessClientRepository from '../repositories/fakes/FakeBusinessClientRepository';

import ListSubscriptionsService from './ListSubscriptionsService';

let fakeBusinessClientRepository: FakeBusinessClientRepository;

let listSubscriptions: ListSubscriptionsService;

describe('ListSubscriptions', () => {
  beforeEach(() => {
    fakeBusinessClientRepository = new FakeBusinessClientRepository();

    listSubscriptions = new ListSubscriptionsService(
      fakeBusinessClientRepository,
    );
  });

  it('should be able to list subscriptions from a client', async () => {
    await fakeBusinessClientRepository.create({
      client_id: 'client_id',
      tier_id: 'tier1_id',
    });

    await fakeBusinessClientRepository.create({
      client_id: 'client_id',
      tier_id: 'tier2_id',
    });

    const subscriptions = await listSubscriptions.execute({
      client_id: 'client_id',
    });

    expect(subscriptions.length).toEqual(2);
    expect(subscriptions[0].client_id).toEqual('client_id');
    expect(subscriptions[1].client_id).toEqual('client_id');
  });
});
