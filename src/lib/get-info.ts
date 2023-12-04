import { getCitizen, getFine, getVehicle } from './api';
import type { FineInfo } from './types';

export const getFineInfo = async (id: string) => {
  const fineRes = await getFine(id);

  if (fineRes.error) {
    return null;
  }

  const { fined_cit, fined_vehicle, reason, date_added } = fineRes.result;
  const vehicle = await getVehicle(fined_vehicle);
  const citizen = await getCitizen(fined_cit);

  const fineInfo: FineInfo = {
    id,
    reason,
    dateAdded: new Date(date_added),
    cedula: citizen.result.cedula,
    plate: vehicle.result.plate,
  };

  return fineInfo;
};
