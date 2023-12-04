export type APIres<T> = {
  error?: string | null;
  message: string;
  result: T;
};

export type ResCitizen = {
  id: string;
  name: string;
  last_name: string;
  birth_day: string;
  cedula: number;
  licence_end: string;
  address: string;
};

export type Citizen = {
  id: string;
  name: string;
  lastName: string;
  birthDay: Date;
  cedula: number;
  licenceEnd: Date;
  address: string;
};

export type PostCitizen = {
  name: string;
  last_name: string;
  birth_day: string;
  cedula: number;
  licence_end: string;
  address: string;
};

export type ResVehicle = {
  id: string;
  vtype: 'Carro' | 'Moto';
  brand: string;
  model: string;
  model_year: number;
  plate: string;
  color: string;
  soat_end: string;
  tech_end: string;
  image_url: string;
  owner: string;
};

export type Vehicle = {
  id: string;
  vtype: 'Carro' | 'Moto';
  brand: string;
  model: string;
  modelYear: number;
  plate: string;
  color: string;
  soatEnd: Date;
  techEnd: Date;
  imageUrl: string;
  owner: string;
};

export type PostVehicle = {
  vtype: 'Carro' | 'Moto';
  brand: string;
  model: string;
  modelYear: number;
  plate: string;
  color: string;
  soatEnd: Date;
  techEnd: Date;
  imageUrl: string;
  owner: string;
};

export type ResFine = {
  id: string;
  reason: string;
  fined_cit: string;
  fined_vehicle: string;
  date_added: string;
};

export type Fine = {
  id: string;
  reason: string;
  finedCit: string;
  finedVehicle: string;
  dateAdded: Date;
};

export type PostFine = {
  id: string;
  reason: string;
  finedCit: string;
  finedVehicle: string;
};

export type FineInfo = {
  id: string;
  reason: string;
  cedula: number;
  plate: string;
  dateAdded: Date;
};
