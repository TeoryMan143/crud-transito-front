import type {
  APIres,
  Citizen,
  Fine,
  ResCitizen,
  ResFine,
  ResVehicle,
  Vehicle,
} from './types';

const BASE_URL = 'https://transit-api.deno.dev';

export const formatCitizen = (resCitizen: ResCitizen) => {
  const citizen: Citizen = {
    ...resCitizen,
    lastName: resCitizen.last_name,
    birthDay: new Date(resCitizen.birth_day),
    licenceEnd: new Date(resCitizen.licence_end),
  };
  return citizen;
};

export const getAllCitizens = async () => {
  const res = await fetch(`${BASE_URL}/citizen`);
  const json: APIres<ResCitizen[]> = await res.json();
  const citizens = json.result.map(resCit => formatCitizen(resCit));
  return citizens;
};

export const formatVehicle = (resVehicle: ResVehicle) => {
  const vehicle: Vehicle = {
    ...resVehicle,
    modelYear: resVehicle.model_year,
    imageUrl: resVehicle.image_url,
    soatEnd: new Date(resVehicle.soat_end),
    techEnd: new Date(resVehicle.tech_end),
  };
  return vehicle;
};

export const getAllVehicles = async () => {
  const res = await fetch(`${BASE_URL}/vehicle`);
  const json: APIres<ResVehicle[]> = await res.json();
  const vehicles = json.result.map(resVehicle => formatVehicle(resVehicle));
  return vehicles;
};

export const formatFine = (resFine: ResFine) => {
  const fine: Fine = {
    ...resFine,
    finedCit: resFine.fined_cit,
    finedVehicle: resFine.fined_vehicle,
    dateAdded: new Date(resFine.date_added),
  };
  return fine;
};

export const getAllFines = async () => {
  const res = await fetch(`${BASE_URL}/fine`);
  const json: APIres<ResFine[]> = await res.json();
  const fines = json.result.map(fine => formatFine(fine));
  return fines;
};

export const getFine = async (id: string) => {
  const res = await fetch(`${BASE_URL}/fine/${id}`);
  const json: APIres<ResFine> = await res.json();
  return json;
};

export const getCitizen = async (id: string) => {
  const res = await fetch(`${BASE_URL}/citizen/${id}`);
  const json: APIres<ResCitizen> = await res.json();
  return json;
};

export const getVehicle = async (id: string) => {
  const res = await fetch(`${BASE_URL}/vehicle/${id}`);
  const json: APIres<ResVehicle> = await res.json();
  return json;
};

export const getCitizenByCedula = async (cedula: number) => {
  const res = await fetch(`${BASE_URL}/citizen?cedula=${cedula}`);
  const json: APIres<ResCitizen> = await res.json();
  return json;
};

export const getCitizenByPlate = async (plate: string) => {
  const res = await fetch(`${BASE_URL}/citizen?plate=${plate}`);
  const json: APIres<ResCitizen> = await res.json();
  return json;
};

export const getVehicleByPlate = async (plate: string) => {
  const res = await fetch(`${BASE_URL}/vehicle?plate=${plate}`);
  const json: APIres<ResVehicle> = await res.json();
  return json;
};

export const getVehiclesByCedula = async (cedula: number) => {
  const res = await fetch(`${BASE_URL}/vehicle?cedula=${cedula}`);
  const json: APIres<ResVehicle[]> = await res.json();
  return json;
};

export const getFinesByPlate = async (plate: string) => {
  const res = await fetch(`${BASE_URL}/fine?plate=${plate}`);
  const json: APIres<ResFine[]> = await res.json();
  return json;
};

export const getFinesByCedula = async (cedula: number) => {
  const res = await fetch(`${BASE_URL}/fine?cedula=${cedula}`);
  const json: APIres<ResFine[]> = await res.json();
  return json;
};

export const getVehiclesByCitizen = async (id: string) => {
  const res = await fetch(`${BASE_URL}/vehicle?owner=${id}`);
  const json: APIres<ResVehicle[]> = await res.json();
  return json;
};

export const getFinesByCitizen = async (id: string) => {
  const res = await fetch(`${BASE_URL}/fine?citizen=${id}`);
  const json: APIres<ResFine[]> = await res.json();
  return json;
};
