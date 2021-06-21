import AppError from '@shared/errors/AppError';

import FakeDeliveryRepository from '../repositories/fakes/FakeDeliveryRepository';

import CreateDeliveryService from './CreateDeliveryService';

let fakeDeliveryRepository: FakeDeliveryRepository;

let createDelivery: CreateDeliveryService;

describe('CreateDelivery', () => {
  beforeEach(() => {
    fakeDeliveryRepository = new FakeDeliveryRepository();

    createDelivery = new CreateDeliveryService(fakeDeliveryRepository);
  });

  it('should be able to create a delivery', async () => {
    const currentYear = new Date().getFullYear();

    const currentDate = new Date(currentYear + 1, 1, 1, 12);

    const delivery = await createDelivery.execute({
      date: currentDate,
      owner_id: 'owner_id',
      perk_id: 'perk_id',
    });

    expect(delivery).toHaveProperty('id');
  });

  it('should not be able to create a delivery on a past date', async () => {
    const currentYear = new Date().getFullYear();

    const currentDate = new Date(currentYear - 1, 1, 1, 5);

    expect(
      createDelivery.execute({
        date: currentDate,
        owner_id: 'owner_id',
        perk_id: 'perk_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a delivery outside the 8am and 5pm interval', async () => {
    const currentYear = new Date().getFullYear();

    const currentDate = new Date(currentYear + 1, 1, 1, 5);

    expect(
      createDelivery.execute({
        date: currentDate,
        owner_id: 'owner_id',
        perk_id: 'perk_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create two deliveries for the same date', async () => {
    const currentYear = new Date().getFullYear();

    const currentDate = new Date(currentYear + 1, 1, 1, 12);

    await createDelivery.execute({
      date: currentDate,
      owner_id: 'owner_id',
      perk_id: 'perk_id',
    });

    expect(
      createDelivery.execute({
        date: currentDate,
        owner_id: 'owner_id',
        perk_id: 'perk_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
