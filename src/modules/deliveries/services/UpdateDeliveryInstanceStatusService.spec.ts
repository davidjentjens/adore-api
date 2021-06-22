import AppError from '@shared/errors/AppError';

import FakeBusinessRepository from '@modules/businesses/repositories/fakes/FakeBusinessRepository';
import FakeTierRepository from '@modules/businesses/repositories/fakes/FakeTierRepository';
import FakePerksRepository from '@modules/businesses/repositories/fakes/FakePerksRepository';
import FakeDeliveryRepository from '../repositories/fakes/FakeDeliveryRepository';
import FakeDeliveryInstanceRepository from '../repositories/fakes/FakeDeliveryInstanceRepository';

import UpdateDeliveryInstanceStatusService from './UpdateDeliveryInstanceStatusService';

let fakeBusinessRepository: FakeBusinessRepository;
let fakeTierRepository: FakeTierRepository;
let fakePerksRepository: FakePerksRepository;
let fakeDeliveryRepository: FakeDeliveryRepository;
let fakeDeliveryInstanceRepository: FakeDeliveryInstanceRepository;

let updateDeliveryInstanceStatus: UpdateDeliveryInstanceStatusService;

describe('UpdateDeliveryInstanceStatus', () => {
  beforeEach(() => {
    fakeBusinessRepository = new FakeBusinessRepository();
    fakeTierRepository = new FakeTierRepository();
    fakePerksRepository = new FakePerksRepository();
    fakeDeliveryRepository = new FakeDeliveryRepository();
    fakeDeliveryInstanceRepository = new FakeDeliveryInstanceRepository();

    updateDeliveryInstanceStatus = new UpdateDeliveryInstanceStatusService(
      fakeDeliveryInstanceRepository,
    );
  });

  it("should be able to update a delivery instance's status", async () => {
    const business = await fakeBusinessRepository.create({
      name: 'Restaurante do João',
      desc: 'Descrição teste.',
      latitude: 0,
      longitude: 0,
      email: 'Joao@contato.com.br',
      whatsapp: '123456789',
      category_id: '123',
      image_url: 'http://image-url.com',
      logo_url: 'http://logo-url.com',
      zone: 'Flamengo',
      featured: true,
      owner_id: 'owner_id',
    });

    const tier = await fakeTierRepository.create({
      name: 'Tier Teste',
      business_id: business.id,
      business,
      desc: '',
      image_url: 'http://image-url.com',
      value: 9999,
      rank: 1,
    });

    const perk = await fakePerksRepository.create({
      title: 'Test Perk',
      tier_id: tier.id,
      tier,
      image_url: '',
      desc: '',
    });

    const delivery = await fakeDeliveryRepository.create({
      date: new Date(),
      perk_id: perk.id,
      perk,
    });

    const deliveryInstanceOld = await fakeDeliveryInstanceRepository.create({
      client_id: 'client_id',
      delivery_id: 'delivery_id',
      delivery,
    });

    const deliveryInstanceNew = await updateDeliveryInstanceStatus.execute({
      delivery_instance_id: deliveryInstanceOld.id,
      owner_id: business.owner_id,
      status: 'preparing',
    });

    expect(deliveryInstanceNew.status).toEqual('preparing');
  });

  it("should not be able to update a non-existant delivery instance's status", async () => {
    expect(
      updateDeliveryInstanceStatus.execute({
        delivery_instance_id: 'fake_id',
        owner_id: 'client_id',
        status: 'preparing',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to update a delivery instance's status if user is not the owner of the business", async () => {
    const business = await fakeBusinessRepository.create({
      name: 'Restaurante do João',
      desc: 'Descrição teste.',
      latitude: 0,
      longitude: 0,
      email: 'Joao@contato.com.br',
      whatsapp: '123456789',
      category_id: '123',
      image_url: 'http://image-url.com',
      logo_url: 'http://logo-url.com',
      zone: 'Flamengo',
      featured: true,
      owner_id: 'owner_id',
    });

    const tier = await fakeTierRepository.create({
      name: 'Tier Teste',
      business_id: business.id,
      business,
      desc: '',
      image_url: 'http://image-url.com',
      value: 9999,
      rank: 1,
    });

    const perk = await fakePerksRepository.create({
      title: 'Test Perk',
      tier_id: tier.id,
      tier,
      image_url: '',
      desc: '',
    });

    const delivery = await fakeDeliveryRepository.create({
      date: new Date(),
      perk_id: perk.id,
      perk,
    });

    const deliveryInstanceOld = await fakeDeliveryInstanceRepository.create({
      client_id: 'client_id',
      delivery_id: 'delivery_id',
      delivery,
    });

    expect(
      updateDeliveryInstanceStatus.execute({
        delivery_instance_id: deliveryInstanceOld.id,
        owner_id: 'fake_id',
        status: 'preparing',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
