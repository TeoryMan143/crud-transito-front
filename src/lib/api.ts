import type { APIresAllCitizen, Citizen, ResCitizen } from './types';

const BASE_URL = 'https://transit-api.deno.dev';

const formatCitizen = (resCitizen: ResCitizen) => {
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
  const json: APIresAllCitizen = await res.json();
  const citizens = json.result.map(resCit => formatCitizen(resCit));
  return citizens;
};
