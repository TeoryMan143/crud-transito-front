import * as Form from '@radix-ui/react-form';
import { type FormEventHandler, useState } from 'react';
import {
  addCitizen,
  addFine,
  getCitizen,
  getCitizenByCedula,
  getCitizenByPlate,
  getVehicleByPlate,
} from '../../../../lib/api';
import DoneAni from '../../../done';
import type { PostFine } from '../../../../lib/types';

function NewFineForm() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const reason = formData.get('reason');
    const plate = formData.get('plate');

    if (!reason || !plate) {
      setLoading(false);
      setDone(true);
      return;
    }

    const vehicleRes = await getVehicleByPlate(plate.toString());

    if (vehicleRes.error) return window.alert('Ha ocurrido un error');

    const citizenRes = await getCitizenByPlate(vehicleRes.result.plate);

    if (citizenRes.error) {
      return window.alert('Ha ocurrido un error');
    }

    const fine: PostFine = {
      reason: reason.toString(),
      fined_cit: citizenRes.result.id,
      fined_vehicle: vehicleRes.result.id,
    };

    const res = await addFine(fine);

    setLoading(false);

    if (res.error) return window.alert('Ha ocurrido un error');

    setDone(true);
  };

  return (
    <div className='flex justify-center items-center mt-16 '>
      <Form.Root
        className='rounded-md p-5 border-2 border-red-500 w-[370PX] bg-amber-100 text-black'
        onSubmit={handleSubmit}
      >
        {done ? (
          <div className='flex flex-col justify-center items-center'>
            <DoneAni />
            <p>Multa registrada</p>
          </div>
        ) : (
          <>
            <h2 className='font-bold text-2xl mb-3 text-red-500'>
              Añadir Multa
            </h2>
            <div className='flex flex-col gap-3'>
              <Form.Field name='reason'>
                <div className='flex items-baseline justify-between'>
                  <Form.Label className='leading-[35px]'>Razon</Form.Label>
                  <Form.Message
                    className='text-sm text-red-400 opacity-[0.8]'
                    match='valueMissing'
                  >
                    Por favor introduce un razon
                  </Form.Message>
                </div>
                <Form.Control asChild>
                  <textarea
                    className='box-border w-full bg-red-500 shadow-white inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-white shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_white] focus:shadow-[0_0_0_2px_white] selection:color-white selection:bg-white min-h-[100px]'
                    required
                  />
                </Form.Control>
              </Form.Field>
              <Form.Field name='plate'>
                <div className='flex items-baseline justify-between'>
                  <Form.Label className='leading-[35px]'>Placa</Form.Label>
                  <Form.Message
                    className='text-sm text-red-400 opacity-[0.8]'
                    match='valueMissing'
                  >
                    Por favor introduce una placa
                  </Form.Message>
                </div>
                <Form.Control asChild>
                  <input
                    className='box-border w-full bg-red-500 shadow-white inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-white shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_white] focus:shadow-[0_0_0_2px_white] selection:color-white selection:bg-white'
                    required
                  />
                </Form.Control>
              </Form.Field>
              <div className='grid place-content-center mt-5'>
                <Form.Submit asChild>
                  <button
                    className='bg-white rounded-md text-slate-800 p-3'
                    disabled={loading}
                  >
                    {loading ? (
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='1em'
                        height='1em'
                        viewBox='0 0 24 24'
                      >
                        <g
                          fill='none'
                          stroke='currentColor'
                          strokeLinecap='round'
                          strokeWidth='2'
                        >
                          <path
                            strokeDasharray='60'
                            strokeDashoffset='60'
                            strokeOpacity='.3'
                            d='M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z'
                          >
                            <animate
                              fill='freeze'
                              attributeName='stroke-dashoffset'
                              dur='1.3s'
                              values='60;0'
                            />
                          </path>
                          <path
                            strokeDasharray='15'
                            strokeDashoffset='15'
                            d='M12 3C16.9706 3 21 7.02944 21 12'
                          >
                            <animate
                              fill='freeze'
                              attributeName='stroke-dashoffset'
                              dur='0.3s'
                              values='15;0'
                            />
                            <animateTransform
                              attributeName='transform'
                              dur='1.5s'
                              repeatCount='indefinite'
                              type='rotate'
                              values='0 12 12;360 12 12'
                            />
                          </path>
                        </g>
                      </svg>
                    ) : (
                      <strong>Agregar</strong>
                    )}
                  </button>
                </Form.Submit>
              </div>
            </div>
          </>
        )}
      </Form.Root>
    </div>
  );
}
export default NewFineForm;
