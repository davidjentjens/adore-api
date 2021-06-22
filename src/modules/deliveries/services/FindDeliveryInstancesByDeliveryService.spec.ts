import AppError from '@shared/errors/AppError';

import FakeDeliveryInstanceRepository from '../repositories/fakes/FakeDeliveryInstanceRepository';
import FakeDeliveryRepository from '../repositories/fakes/FakeDeliveryRepository';

import FindDeliveryInstancesByDeliveryService from './FindDeliveryInstancesByDeliveryService';

let fakeDeliveryInstanceRepository: FakeDeliveryInstanceRepository;
let fakeDeliveryRepository: FakeDeliveryRepository;

let findDeliveryInstancesByDelivery: FindDeliveryInstancesByDeliveryService;

describe('FindDeliveryInstancesByDelivery', () => {
  beforeEach(() => {
    fakeDeliveryRepository = new FakeDeliveryRepository();
    fakeDeliveryInstanceRepository = new FakeDeliveryInstanceRepository();

    findDeliveryInstancesByDelivery =
      new FindDeliveryInstancesByDeliveryService(
        fakeDeliveryInstanceRepository,
        fakeDeliveryRepository,
      );
  });

  it('should be able to find delivery instance by delivery', async () => {
    const currentDate = new Date();

    const delivery = await fakeDeliveryRepository.create({
      date: currentDate,
      perk_id: 'perk_id',
    });

    await fakeDeliveryInstanceRepository.create({
      client_id: 'client_id',
      delivery_id: delivery.id,
    });

    await fakeDeliveryInstanceRepository.create({
      client_id: 'client_id',
      delivery_id: delivery.id,
    });

    await fakeDeliveryInstanceRepository.create({
      client_id: 'client_id',
      delivery_id: 'delivery_id',
    });

    const foundDeliveryInstances =
      await findDeliveryInstancesByDelivery.execute({
        delivery_id: delivery.id,
      });

    expect(foundDeliveryInstances.length).toEqual(2);
  });

  it('should not be able to find delivery instance with non existant delivery', async () => {
    await fakeDeliveryInstanceRepository.create({
      client_id: 'client_id',
      delivery_id: 'delivery_id',
    });

    expect(
      findDeliveryInstancesByDelivery.execute({
        delivery_id: 'delivery_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
