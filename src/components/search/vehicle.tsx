import { useEffect, useState } from 'react';
import {
  formatVehicle,
  getVehicleByPlate,
  getVehiclesByCedula,
} from '../../lib/api.ts';
import type { Vehicle } from '../../lib/types.ts';
import * as RadioGroup from '@radix-ui/react-radio-group';
import VehicleCard from '../pages/vehicle/vehicle-card.tsx';

function Search() {
  const [query, setQuery] = useState<number | string>(0);
  const [queryVehicles, setQueryVehicles] = useState<Vehicle[] | null>(null);
  const [searchType, setSearchType] = useState('plate');

  useEffect(() => {
    const run = async () => {
      if (searchType === 'cedula') {
        if (!query) return;
        const vehicleRes = await getVehiclesByCedula(query as number);
        if (vehicleRes.error) {
          return setQueryVehicles(null);
        }
        const vehicles = vehicleRes.result.map(vehicle =>
          formatVehicle(vehicle)
        );
        setQueryVehicles(vehicles);
      } else if (searchType === 'plate') {
        if (!query) return;
        const vehicleRes = await getVehicleByPlate(
          (query as string).toUpperCase()
        );
        if (vehicleRes.error) {
          return setQueryVehicles(null);
        }
        const vehicles = formatVehicle(vehicleRes.result);
        setQueryVehicles([vehicles]);
      }
    };
    run();
  }, [query, searchType]);

  return (
    <div className='border-2 border-red-500 rounded-xl p-3 flex flex-col w-[400px] gap-3 h-full'>
      <h3 className='text-3xl text-red-500 font-semibold'>Buscar Vehiculo</h3>
      <RadioGroup.Root
        defaultValue='plate'
        onValueChange={value => setSearchType(value)}
      >
        <h4 className='text-red-400 text-xl mb-3'>Buscar por:</h4>
        <div className='flex flex-col gap-3'>
          <div className='flex items-center'>
            <RadioGroup.Item
              value='plate'
              id='rad-plate'
              className='bg-white w-[25px] h-[25px] rounded-full outline-none cursor-default border-[1.5px] border-amber-300'
            >
              <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[50%] after:bg-red-500" />
            </RadioGroup.Item>
            <label className='pl-3' htmlFor='rad-plate'>
              Placa
            </label>
          </div>
          <div className='flex items-center'>
            <RadioGroup.Item
              value='cedula'
              id='rad-cedula'
              className='bg-white w-[25px] h-[25px] rounded-full outline-none cursor-default border-[1.5px] border-amber-300'
            >
              <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[50%] after:bg-red-500" />
            </RadioGroup.Item>
            <label className='pl-3' htmlFor='rad-cedula'>
              Cedula
            </label>
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
      {!queryVehicles ? (
        <p>Vehiculo no encontrado</p>
      ) : (
        queryVehicles.map(vehicle => (
          <VehicleCard vehicle={vehicle} key={vehicle.id} />
        ))
      )}
    </div>
  );
}
export default Search;
