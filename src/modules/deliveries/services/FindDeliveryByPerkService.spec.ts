import AppError from '@shared/errors/AppError';

import FakePerksRepository from '@modules/businesses/repositories/fakes/FakePerksRepository';
import FakeDeliveryRepository from '../repositories/fakes/FakeDeliveryRepository';

import FindDeliveryByPerkService from './FindDeliveryByPerkService';

let fakePerksRepository: FakePerksRepository;
let fakeDeliveryRepository: FakeDeliveryRepository;

let findDeliveryByPerk: FindDeliveryByPerkService;

describe('FindDeliveryByPerk', () => {
  beforeEach(() => {
    fakePerksRepository = new FakePerksRepository();
    fakeDeliveryRepository = new FakeDeliveryRepository();

    findDeliveryByPerk = new FindDeliveryByPerkService(
      fakeDeliveryRepository,
      fakePerksRepository,
    );
  });

  it('should be able to find all deliveries by perk', async () => {
    const currentDate = new Date();

    const perk = await fakePerksRepository.create({
      title: 'Test Perk',
      desc: '',
      image_url: '',
      tier_id: 'tier_id',
    });

    await fakeDeliveryRepository.create({
      perk_id: perk.id,
      date: currentDate,
    });

    await fakeDeliveryRepository.create({
      perk_id: perk.id,
      date: currentDate,
    });

    await fakeDeliveryRepository.create({
      perk_id: 'other_perk_id',
      date: currentDate,
    });

    const deliveryInstances = await findDeliveryByPerk.execute({
      perk_id: perk.id,
    });

    expect(deliveryInstances.length).toEqual(2);
  });

  it('should not be able to find deliveries from non-existant perk', async () => {
    const currentDate = new Date();

    await fakeDeliveryRepository.create({
      perk_id: 'perk_id',
      date: currentDate,
    });

    expect(
      findDeliveryByPerk.execute({
        perk_id: 'perk_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
