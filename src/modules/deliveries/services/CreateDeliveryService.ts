import { startOfHour, isBefore, getHours, isEqual } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Delivery from '@modules/deliveries/infra/typeorm/entities/Delivery';
import IDeliveryRepository from '@modules/deliveries/repositories/IDeliveryRepository';

// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
// import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';

interface IRequest {
  owner_id: string;
  date: Date;
  perk_id: string;
}

@injectable()
class CreateDeliveryService {
  constructor(
    @inject('DeliveryRepository')
    private deliveryRepository: IDeliveryRepository,
  ) /* @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider, */ {}

  public async execute({
    owner_id,
    date,
    perk_id,
  }: IRequest): Promise<Delivery> {
    const deliveryDate = startOfHour(date);

    if (isBefore(deliveryDate, Date.now())) {
      throw new AppError("You can't create an delivery on a past date.");
    }

    if (getHours(deliveryDate) < 8 || getHours(deliveryDate) > 17) {
      throw new AppError('You can only create deliveries between 8am and 5pm');
    }

    const findDeliveriesByPerk = await this.deliveryRepository.findByPerk(
      perk_id,
    );

    const findDeliveryInSameHour = findDeliveriesByPerk.find(delivery => {
      const date1 = date;
      const date2 = delivery.date;

      date1.setMinutes(0, 0, 0);
      date2.setMinutes(0, 0, 0);

      return isEqual(date1, date2);
    });

    if (findDeliveryInSameHour) {
      throw new AppError('There already is a delivery scheduled for this date');
    }

    const delivery = await this.deliveryRepository.create({
      date: deliveryDate,
      perk_id,
    });

    // const formattedDate = format(deliveryDate, "dd/MM/yyyy 'às' HH:mm'h'");

    // await this.notificationsRepository.create({
    //   recipient_id: owner_id,
    //   content: `Novo agendamento para dia ${formattedDate}`,
    // });

    // await this.cacheProvider.invalidate(
    //   `provider-appointments:${owner_id}:${format(deliveryDate, 'yyyy-M-d')}`,
    // );

    return delivery;
  }
}

export default CreateDeliveryService;
