import { uuid } from 'uuidv4';

import IDeliveryInstanceDTO from '@modules/deliveries/dtos/IDeliveryInstanceDTO';

import IDeliveryInstanceRepository from '../IDeliveryInstanceRepository';

import Delivery from '../../infra/typeorm/entities/Delivery';
import DeliveryInstance from '../../infra/typeorm/entities/DeliveryInstance';

interface IRequest extends IDeliveryInstanceDTO {
  delivery?: Delivery;
}

class FakeDeliveryInstanceRepository implements IDeliveryInstanceRepository {
  private deliveryInstanceInstances: DeliveryInstance[] = [];

  public async create(
    deliveryInstanceData: IRequest,
  ): Promise<DeliveryInstance> {
    const deliveryInstance = new DeliveryInstance();

    Object.assign(deliveryInstance, { id: uuid() }, deliveryInstanceData);

    this.deliveryInstanceInstances.push(deliveryInstance);

    return deliveryInstance;
  }

  public async findById(
    deliveryInstance_id: string,
  ): Promise<DeliveryInstance | undefined> {
    const findDeliveryInstance = this.deliveryInstanceInstances.find(
      deliveryInstance => deliveryInstance.id === deliveryInstance_id,
    );

    return findDeliveryInstance;
  }

  public async findByDelivery(
    delivery_id: string,
  ): Promise<DeliveryInstance[]> {
    const findDeliveryInstances = this.deliveryInstanceInstances.filter(
      deliveryInstance => deliveryInstance.delivery_id === delivery_id,
    );

    return findDeliveryInstances;
  }

  public async findByClient(client_id: string): Promise<DeliveryInstance[]> {
    const findDeliveryInstances = this.deliveryInstanceInstances.filter(
      deliveryInstance => deliveryInstance.client_id === client_id,
    );

    return findDeliveryInstances;
  }

  public async save(
    deliveryInstance: DeliveryInstance,
  ): Promise<DeliveryInstance> {
    const findIndex = this.deliveryInstanceInstances.findIndex(
      findDeliveryInstance => findDeliveryInstance.id === deliveryInstance.id,
    );

    this.deliveryInstanceInstances[findIndex] = deliveryInstance;

    return deliveryInstance;
  }

  public async delete(deliveryInstance_id: string): Promise<void> {
    this.deliveryInstanceInstances = this.deliveryInstanceInstances.filter(
      findDeliveryInstance => findDeliveryInstance.id !== deliveryInstance_id,
    );
  }
}

export default FakeDeliveryInstanceRepository;
