import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Delivery from '@modules/deliveries/infra/typeorm/entities/Delivery';

import IDeliveryRepository from '@modules/deliveries/repositories/IDeliveryRepository';
import IPerksRepository from '@modules/businesses/repositories/IPerksRepository';

interface IRequest {
  perk_id: string;
}

@injectable()
class FindDeliveryByPerkService {
  constructor(
    @inject('DeliveryRepository')
    private deliveryRepository: IDeliveryRepository,

    @inject('PerksRepository')
    private perksRepository: IPerksRepository,
  ) {}

  public async execute({ perk_id }: IRequest): Promise<Delivery[]> {
    const perk = await this.perksRepository.findById(perk_id);

    if (!perk) {
      throw new AppError('Perk not found', 404);
    }

    const deliveries = await this.deliveryRepository.findByPerk(perk_id);

    return deliveries;
  }
}

export default FindDeliveryByPerkService;
