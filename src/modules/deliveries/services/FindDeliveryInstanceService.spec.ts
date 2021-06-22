import AppError from '@shared/errors/AppError';

import FakeDeliveryInstanceRepository from '../repositories/fakes/FakeDeliveryInstanceRepository';

import FindDeliveryInstanceService from './FindDeliveryInstanceService';

let fakeDeliveryInstanceRepository: FakeDeliveryInstanceRepository;

let findDeliveryInstance: FindDeliveryInstanceService;

describe('FindDeliveryInstance', () => {
  beforeEach(() => {
    fakeDeliveryInstanceRepository = new FakeDeliveryInstanceRepository();

    findDeliveryInstance = new FindDeliveryInstanceService(
      fakeDeliveryInstanceRepository,
    );
  });

  it('should be able to find delivery instance', async () => {
    const deliveryInstance = await fakeDeliveryInstanceRepository.create({
      client_id: 'client_id',
      delivery_id: 'delivery_id',
    });

    const foundDeliveryInstance = await findDeliveryInstance.execute({
      delivery_instance_id: deliveryInstance.id,
    });

    expect(foundDeliveryInstance).toHaveProperty('id');
  });

  it('should not be able to find non-existant delivery instance', async () => {
    expect(
      findDeliveryInstance.execute({
        delivery_instance_id: 'fake_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
