import { useEffect, useState } from 'react';
import {
  formatVehicle,
  getFinesByPlate,
  getFinesByCedula,
  formatFine,
} from '../../lib/api.ts';
import type { Fine, FineInfo } from '../../lib/types.ts';
import FineCard from '../pages/fine/fine-card.tsx';
import * as RadioGroup from '@radix-ui/react-radio-group';
import VehicleCard from '../pages/vehicle/vehicle-card.tsx';
import { getFineInfo } from '../../lib/get-info.ts';

function Search() {
  const [query, setQuery] = useState<number | string>(0);
  const [queryFines, setQueryFines] = useState<FineInfo[] | null>(null);
  const [searchType, setSearchType] = useState('plate');

  useEffect(() => {
    const run = async () => {
      if (searchType === 'cedula') {
        if (!query) return;
        const finesRes = await getFinesByCedula(query as number);
        if (finesRes.error) {
          return setQueryFines(null);
        }
        const fines = finesRes.result.map(fine => formatFine(fine));
        const finesInfo = await Promise.all(
          fines.map(async fine => await getFineInfo(fine.id))
        );
        setQueryFines(finesInfo as FineInfo[]);
      } else if (searchType === 'plate') {
        if (!query) return;
        const finesRes = await getFinesByPlate((query as string).toUpperCase());
        if (finesRes.error) {
          return setQueryFines(null);
        }
        const fines = finesRes.result.map(fine => formatFine(fine));
        const finesInfo = await Promise.all(
          fines.map(async fine => await getFineInfo(fine.id))
        );
        setQueryFines(finesInfo as FineInfo[]);
      }
    };
    run();
  }, [query, searchType]);

  return (
    <div className='border-2 border-red-500 rounded-xl p-3 flex flex-col w-[400px] gap-3 overflow-y-auto h-full'>
      <h3 className='text-3xl text-red-500 font-semibold'>Buscar Multa</h3>
      <RadioGroup.Root
        defaultValue='plate'
        onValueChange={value => setSearchType(value)}
      >
        <h4 className='text-red-400 text-xl'>Buscar por:</h4>
        <div className='flex flex-col gap-3'>
          <div className='flex items-center justify-center'>
            <RadioGroup.Item
              value='plate'
              id='rad-plate'
              className='bg-white w-[25px] h-[25px] rounded-full'
            >
              <div className='flex justify-center items-center'>
                <RadioGroup.Indicator className="flex items-center justify-center relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[50%] after:bg-red-500" />
                <label className='pl-3' htmlFor='rad-plate'>
                  Placa
                </label>
              </div>
            </RadioGroup.Item>
          </div>
          <div className='flex items-center justify-center'>
            <RadioGroup.Item
              value='cedula'
              id='rad-cedula'
              className='bg-white w-[25px] h-[25px] rounded-full'
            >
              <div className='flex justify-center items-center'>
                <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[50%] after:bg-red-500" />
                <label className='pl-3' htmlFor='rad-cedula'>
                  Cedula
                </label>
              </div>
            </RadioGroup.Item>
          </div>
        </div>
      </RadioGroup.Root>
      <input
        className='border border-black rounded-md p-1 w-full focus:border-red-500'
        type={searchType === 'cedula' ? 'number' : 'text'}
        placeholder={`Ingresa una ${
          searchType === 'cedula' ? 'cedula' : 'placa'
        }`}
        onChange={e => {
          if (searchType === 'cedula') {
            const value = parseInt(e.currentTarget.value);
            if (!isNaN(value) && value > 0) {
              setQuery(Math.floor(value));
            }
          } else if (searchType === 'plate') {
            setQuery(e.currentTarget.value);
          }
        }}
      />
      {!queryFines ? (
        <p>Multa no encontrada</p>
      ) : (
        queryFines.map(fineInfo => (
          <FineCard fineInfo={fineInfo} key={fineInfo.id} />
        ))
      )}
    </div>
  );
}
export default Search;
