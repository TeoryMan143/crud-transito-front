type APIres = {
  error?: string | null;
  message: string;
};

export type APIresAllCitizen = APIres & { result: ResCitizen[] };

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
