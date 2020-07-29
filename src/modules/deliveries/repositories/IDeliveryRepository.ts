import IDeliveryDTO from '../dtos/IDeliveryDTO';
import IFindByDateDTO from '../dtos/IFindByDateDTO';

import Delivery from '../infra/typeorm/entities/Delivery';

export default interface IDeliveryRepository {
  create(data: IDeliveryDTO): Promise<Delivery>;
  find(delivery_id: string): Promise<Delivery | undefined>;
  findByDate(data: IFindByDateDTO): Promise<Delivery | undefined>;
  save(delivery: Delivery): Promise<Delivery>;
  delete(delivery_id: string): Promise<void>;
}
