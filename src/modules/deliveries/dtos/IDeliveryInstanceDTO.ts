export default interface IDeliveryInstanceDTO {
  delivery_id: string;
  client_id: string;
  status: 'preparing' | 'shipping' | 'delivered' | 'pending' | 'blocked';
}
