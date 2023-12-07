import * as Form from '@radix-ui/react-form';
import { type FormEventHandler, useState } from 'react';
import { checkImageUrl, delay } from '../../../../lib/utils';
import styles from './styles.module.css';
import { addCitizen } from '../../../../lib/api';

function NewCitizenForm() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const name = formData.get('name');
    const address = formData.get('address');
    const last_name = formData.get('last_name');
    const birth_day = formData.get('birth_day');
    const cedula = formData.get('cedula');
    const licence_end = formData.get('licence_end');

    if (
      !name ||
      !address ||
      !last_name ||
      !birth_day ||
      !cedula ||
      !licence_end
    ) {
      setLoading(false);
      return;
    }

    const birthDate = new Date(birth_day.toString());
    const licenceDate = new Date(licence_end.toString());

    const cit = {
      name: name.toString(),
      address: address.toString(),
      last_name: last_name.toString(),
      birth_day: birthDate.toISOString(),
      cedula: parseInt(cedula.toString()),
      licence_end: licenceDate.toISOString(),
    };

    console.log(cit);

    const res = await addCitizen(cit);

    console.log(res);

    setLoading(false);
  };

  return (
    <div className='flex justify-center items-center mt-16 '>
      <Form.Root
        className='rounded-md p-5 border-2 border-red-500 w-[370PX] bg-amber-100 text-black'
        onSubmit={handleSubmit}
      >
        {done ? (
          <div className='flex flex-col justify-center items-center'>
            <svg
              width='1em'
              height='1em'
              viewBox='0 0 50 50'
              xmlns='http://www.w3.org/2000/svg'
              className='text-6xl'
            >
              <circle
                cx='25'
                cy='25'
                r='20'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
              />
              <path
                onAnimationEnd={() => (window.location.href = '/')}
                id='checkmark'
                className={styles.checkAnimation}
                fill='none'
                stroke='currentColor'
                strokeWidth='4'
                d='M14 27 l7 7 l16 -16'
              />
            </svg>
            <p>Producto registrado</p>
          </div>
        ) : (
          <>
            <h2 className='font-bold text-2xl mb-3 text-red-500'>
              Añadir Ciudadano
            </h2>
            <div className='flex flex-col gap-3'>
              <Form.Field name='name'>
                <div className='flex items-baseline justify-between'>
                  <Form.Label className='leading-[35px]'>Nombre</Form.Label>
                  <Form.Message
                    className='text-sm text-red-400 opacity-[0.8]'
                    match='valueMissing'
                  >
                    Por favor introduce un nombre
                  </Form.Message>
                </div>
                <Form.Control asChild>
                  <input
                    className='box-border w-full bg-red-500 shadow-white inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-white shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_white] focus:shadow-[0_0_0_2px_white] selection:color-white selection:bg-white'
                    required
                  />
                </Form.Control>
              </Form.Field>
              <Form.Field name='cedula'>
                <div className='flex items-baseline justify-between'>
                  <Form.Label className='leading-[35px]'>Cedula</Form.Label>
                  <Form.Message
                    className='text-sm text-red-400 opacity-[0.8]'
                    match='valueMissing'
                  >
                    Por favor introduce una cedula
                  </Form.Message>
                </div>
                <Form.Control asChild>
                  <input
                    className='box-border w-full bg-red-500 shadow-white inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-white shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_white] focus:shadow-[0_0_0_2px_white] selection:color-white selection:bg-white'
                    type='number'
                    required
                  />
                </Form.Control>
              </Form.Field>
              <Form.Field name='last_name'>
                <div className='flex items-baseline justify-between'>
                  <Form.Label className='leading-[35px]'>Apellido</Form.Label>
                  <Form.Message
                    className='text-sm text-red-400 opacity-[0.8]'
                    match='valueMissing'
                  >
                    Por favor introduce un apellido
                  </Form.Message>
                </div>
                <Form.Control asChild>
                  <input
                    className='box-border w-full bg-red-500 shadow-white inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-white shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_white] focus:shadow-[0_0_0_2px_white] selection:color-white selection:bg-white'
                    required
                  />
                </Form.Control>
              </Form.Field>
              <Form.Field name='birth_day'>
                <div className='flex items-baseline justify-between'>
                  <Form.Label className='leading-[35px]'>
                    Fecha de nacimiento
                  </Form.Label>
                  <Form.Message
                    className='text-sm text-red-400 opacity-[0.8]'
                    match='valueMissing'
                  >
                    Por favor ingresa la fecha de nacimiento
                  </Form.Message>
                </div>
                <Form.Control asChild>
                  <input
                    className='box-border w-full bg-red-500 shadow-white inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-white shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_white] focus:shadow-[0_0_0_2px_white] selection:color-white selection:bg-white'
                    type='date'
                    required
                  />
                </Form.Control>
              </Form.Field>
              <Form.Field name='address'>
                <div className='flex items-baseline justify-between'>
                  <Form.Label className='leading-[35px]'>Dirección</Form.Label>
                  <Form.Message
                    className='text-sm text-red-400 opacity-[0.8]'
                    match='valueMissing'
                  >
                    Por favor introduce una dirección
                  </Form.Message>
                </div>
                <Form.Control asChild>
                  <input
                    className='box-border w-full bg-red-500 shadow-white inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-white shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_white] focus:shadow-[0_0_0_2px_white] selection:color-white selection:bg-white'
                    required
                  />
                </Form.Control>
              </Form.Field>
              <Form.Field name='licence_end'>
                <div className='flex items-baseline justify-between'>
                  <Form.Label className='leading-[35px]'>
                    Expiracion de licencia
                  </Form.Label>
                  <Form.Message
                    className='text-sm text-red-400 opacity-[0.8]'
                    match='valueMissing'
                  >
                    Por favor ingresa una fecha de expiracion de licencia
                  </Form.Message>
                </div>
                <Form.Control asChild>
                  <input
                    className='box-border w-full bg-red-500 shadow-white inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-white shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_white] focus:shadow-[0_0_0_2px_white] selection:color-white selection:bg-white'
                    type='date'
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
export default NewCitizenForm;
