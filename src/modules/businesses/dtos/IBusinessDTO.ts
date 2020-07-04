export default interface ICreateBusinessDTO {
  owner_id: string;
  category_id: string;
  name: string;
  desc: string;
  latitude: number;
  longitude: number;
  image_url: string;
  featured: boolean;
  email?: string;
  whatsapp?: string;
}
