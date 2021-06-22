import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateDeliveryInstanceService from '@modules/deliveries/services/CreateDeliveryInstanceService';
import FindDeliveryInstancesByDeliveryService from '@modules/deliveries/services/FindDeliveryInstancesByDeliveryService';
import FindAllDeliveryInstancesByClientService from '@modules/deliveries/services/FindAllDeliveryInstancesByClientService';
import UpdateDeliveryInstanceStatusService from '@modules/deliveries/services/UpdateDeliveryInstanceStatusService';

export default class DeliveryInstanceController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { id: owner_id } = req.user;
    const { client_id, delivery_id } = req.body;

    const createDeliveryInstance = container.resolve(
      CreateDeliveryInstanceService,
    );

    const deliveryInstance = await createDeliveryInstance.execute({
      owner_id,
      client_id,
      delivery_id,
    });

    return res.json(deliveryInstance);
  }

  public async findByDelivery(req: Request, res: Response): Promise<Response> {
    const { id: delivery_id } = req.params;

    const findDeliveryInstancesByDelivery = container.resolve(
      FindDeliveryInstancesByDeliveryService,
    );

    const deliveryInstances = await findDeliveryInstancesByDelivery.execute({
      delivery_id,
    });

    return res.json(deliveryInstances);
  }

  public async findByClient(req: Request, res: Response): Promise<Response> {
    const { id: client_id } = req.params;

    const findAllDeliveryInstancesByClient = container.resolve(
      FindAllDeliveryInstancesByClientService,
    );

    const deliveryInstances = await findAllDeliveryInstancesByClient.execute({
      client_id,
    });

    return res.json(deliveryInstances);
  }

  public async updateStatus(req: Request, res: Response): Promise<Response> {
    const { id: owner_id } = req.user;
    const { id: delivery_instance_id } = req.params;
    const { status } = req.body;

    const updateDeliveryInstanceStatus = container.resolve(
      UpdateDeliveryInstanceStatusService,
    );

    const deliveryInstance = await updateDeliveryInstanceStatus.execute({
      owner_id,
      delivery_instance_id,
      status,
    });

    return res.json(deliveryInstance);
  }
}
