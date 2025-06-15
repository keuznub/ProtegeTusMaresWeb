export interface IReport {
  id: string;
  type: string;
  geoLocation: { latitude: number; longitude: number };
  address: Address;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  description: string;
  imageUrl: string;
  userId?: string;
  notification?: string;
  state: string;
}

interface Address {
  street: string,
  city: string
}