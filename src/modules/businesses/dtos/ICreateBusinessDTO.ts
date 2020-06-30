export default interface ICreateBusinessDTO {
  owner_id: string;
  name: string;
  latitude: number;
  longitude: number;
  email?: string;
  whatsapp?: string;
}
