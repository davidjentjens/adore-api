import IDeliveryInstanceDTO from '../dtos/IDeliveryInstanceDTO';

import DeliveryInstance from '../infra/typeorm/entities/DeliveryInstance';

export default interface IDeliveryRepository {
  create(data: IDeliveryInstanceDTO): Promise<DeliveryInstance>;
  findById(delivery_instance_id: string): Promise<DeliveryInstance | undefined>;
  findByDelivery(delivery_id: string): Promise<DeliveryInstance[]>;
  findByClient(client_id: string): Promise<DeliveryInstance[]>;
  save(delivery_instance: DeliveryInstance): Promise<DeliveryInstance>;
  delete(delivery_instance_id: string): Promise<void>;
}
