export default interface ICreateBusinessDTO {
  owner_id: string;
  type:
    | 'Cervejaria'
    | 'Hamburgueria'
    | 'Pizzaria'
    | 'Gelateria'
    | 'Padaria'
    | 'Queijaria'
    | 'Cafeteria';
  name: string;
  desc: string;
  latitude: number;
  longitude: number;
  email?: string;
  whatsapp?: string;
}
