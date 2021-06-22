import FakeDeliveryInstanceRepository from '../repositories/fakes/FakeDeliveryInstanceRepository';

import FindAllDeliveryInstancesByClientService from './FindAllDeliveryInstancesByClientService';

let fakeDeliveryInstanceRepository: FakeDeliveryInstanceRepository;

let findAllDeliveryInstancesByClient: FindAllDeliveryInstancesByClientService;

describe('FindAllDeliveryInstancesByClient', () => {
  beforeEach(() => {
    fakeDeliveryInstanceRepository = new FakeDeliveryInstanceRepository();

    findAllDeliveryInstancesByClient =
      new FindAllDeliveryInstancesByClientService(
        fakeDeliveryInstanceRepository,
      );
  });

  it('should be able to find all delivery instances by client', async () => {
    await fakeDeliveryInstanceRepository.create({
      client_id: 'client_id',
      delivery_id: 'delivery_id1',
    });

    await fakeDeliveryInstanceRepository.create({
      client_id: 'client_id',
      delivery_id: 'delivery_id2',
    });

    await fakeDeliveryInstanceRepository.create({
      client_id: 'other_client_id',
      delivery_id: 'delivery_id3',
    });

    const deliveryInstances = await findAllDeliveryInstancesByClient.execute({
      client_id: 'client_id',
    });

    expect(deliveryInstances.length).toEqual(2);
  });
});
