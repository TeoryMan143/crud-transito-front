import { z } from 'zod';

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

export type FineInfo = {
  id: string;
  reason: string;
  cedula: number;
  plate: string;
  dateAdded: Date;
};

const vehicleSchema = z.object({
  vtype: z.enum(['Carro', 'Moto']),
  brand: z.string().trim(),
  model: z.string().trim(),
  model_year: z.number().min(2000).max(2024).int(),
  plate: z.string().trim().length(6),
  color: z.string().trim(),
  soat_end: z.string().datetime(),
  tech_end: z.string().datetime(),
  image_url: z.string(),
  owner: z.string().uuid(),
});

export type PostVehicle = z.infer<typeof vehicleSchema>;
export type PartialVehicle = Partial<Vehicle>;

export const validateVehicle = (vehicle: object) =>
  vehicleSchema.safeParse(vehicle);

export const validatePartialVehicle = (vehicle: object) =>
  vehicleSchema.partial().safeParse(vehicle);

const citizenSchema = z.object({
  name: z.string().trim(),
  last_name: z.string().trim(),
  birth_day: z.string().datetime(),
  cedula: z.number().int().positive(),
  licence_end: z.string().datetime(),
  address: z.string(),
});

export type PostCitizen = z.infer<typeof citizenSchema>;
export type PartialCitizen = Partial<Citizen>;

export const validateCitizen = (citizen: object) =>
  citizenSchema.safeParse(citizen);

export const validatePartialCitizen = (citizen: object) =>
  citizenSchema.partial().safeParse(citizen);

const fineSchema = z.object({
  reason: z.string().trim(),
  fined_cit: z.string().uuid(),
  fined_vehicle: z.string().uuid(),
});

export type PostFine = z.infer<typeof fineSchema>;
export type PartialFine = Partial<Fine>;

export const validateFine = (fine: object) => fineSchema.safeParse(fine);

export const validatePartialFine = (fine: object) =>
  fineSchema.partial().safeParse(fine);
