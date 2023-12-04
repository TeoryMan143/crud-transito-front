import { useEffect, useState } from 'react';
import {
  formatCitizen,
  getCitizenByCedula,
  getCitizenByPlate,
} from '../../lib/api';
import type { Citizen } from '../../lib/types';
import CitizenCard from '../pages/citizen/citizen-card.tsx';
import * as RadioGroup from '@radix-ui/react-radio-group';

function Search() {
  const [query, setQuery] = useState<number | string>(0);
  const [queryCitizen, setQueryCitizen] = useState<Citizen | null>(null);
  const [searchType, setSearchType] = useState('cedula');

  useEffect(() => {
    const run = async () => {
      if (searchType === 'cedula') {
        if (!query) return;
        const citizenRes = await getCitizenByCedula(query as number);
        if (citizenRes.error) {
          return setQueryCitizen(null);
        }
        const citizen = formatCitizen(citizenRes.result);
        setQueryCitizen(citizen);
      } else if (searchType === 'plate') {
        if (!query) return;
        const citizenRes = await getCitizenByPlate(query as string);
        if (citizenRes.error) {
          return setQueryCitizen(null);
        }
        const citizen = formatCitizen(citizenRes.result);
        setQueryCitizen(citizen);
      }
    };
    run();
  }, [query, searchType]);

  return (
    <div className='border-2 border-red-500 rounded-xl p-3 flex flex-col w-[300px] gap-3'>
      <h3 className='text-3xl text-red-500 font-semibold'>Buscar Ciudadano</h3>
      <RadioGroup.Root
        defaultValue='cedula'
        onValueChange={value => setSearchType(value)}
      >
        <h4 className='text-red-400 text-xl'>Buscar por:</h4>
        <div className='flex flex-col gap-3'>
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
      {!queryCitizen ? (
        <p>Ciudadano no encontrado</p>
      ) : (
        <CitizenCard citizen={queryCitizen} />
      )}
    </div>
  );
}
export default Search;
