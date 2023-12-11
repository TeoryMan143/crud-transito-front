import * as Form from '@radix-ui/react-form';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { type FormEventHandler, useState } from 'react';
import {
  addVehicle,
  getCitizen,
  getCitizenByCedula,
} from '../../../../lib/api';
import DoneAni from '../../../done';
import type { PostVehicle } from '../../../../lib/types';
import { CarIcon } from '../../../icons/car';
import { MotorcycleIcon } from '../../../icons/motor-cycle';
import { checkImageUrl } from '../../../../lib/utils';

function NewVehicleForm() {
  const [loading, setLoading] = useState(false);
  const [vType, setVType] = useState('Carro');
  const [done, setDone] = useState(false);
  const classItems =
    'flex flex-col items-center data-[state=on]:text-red-500 data-[state=on]:font-bold';

  const handleSubmit: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const brand = formData.get('brand');
    const model = formData.get('model');
    const model_year = formData.get('model_year');
    const plate = formData.get('plate');
    const soat_end = formData.get('soat_end');
    const tech_end = formData.get('tech_end');
    const image_url = formData.get('image_url');
    const owner = formData.get('owner');
    const color = formData.get('color');

    if (
      !brand ||
      !model ||
      !model_year ||
      !plate ||
      !soat_end ||
      !tech_end ||
      !image_url ||
      !owner ||
      !color
    ) {
      window.alert('Ha ocurrido un error');
      return setLoading(false);
    }

    const soatDate = new Date(soat_end.toString());
    const techDate = new Date(tech_end.toString());
    const citRes = await getCitizenByCedula(parseInt(owner.toString()));

    if (citRes.error) return window.alert('Ha ocurrido un error');

    const vehi: PostVehicle = {
      vtype: vType,
      brand: brand.toString(),
      model: model.toString(),
      model_year: parseInt(model_year.toString()),
      plate: plate.toString(),
      soat_end: soatDate.toISOString(),
      tech_end: techDate.toISOString(),
      image_url: image_url.toString(),
      owner: citRes.result.id,
      color: color.toString(),
    } as PostVehicle;

    const res = await addVehicle(vehi);

    if (res.error) {
      setLoading(false);
      return window.alert('Ha ocurrido un error');
    }

    setLoading(false);
    setDone(true);
  };

  return (
    <div className='flex justify-center items-center mt-16 h-full'>
      <Form.Root
        className='rounded-md p-5 border-2 border-red-500 w-[450px] bg-amber-100 text-black'
        onSubmit={handleSubmit}
      >
        {done ? (
          <div className='flex flex-col justify-center items-center'>
            <DoneAni />
            <p>Vehiculo registrado</p>
          </div>
        ) : (
          <>
            <h2 className='font-bold text-2xl mb-3 text-red-500'>
              Añadir Vehiculo
            </h2>
            <div className='flex flex-col gap-3'>
              <div className='flex gap-1'>
                <Form.Field name='brand' className='flex-1'>
                  <div className='flex items-baseline justify-between'>
                    <Form.Label className='leading-[35px]'>
                      Fabricante
                    </Form.Label>
                    <Form.Message
                      className='text-sm text-red-400 opacity-[0.8]'
                      match='valueMissing'
                    >
                      Por favor introduce un fabricante
                    </Form.Message>
                  </div>
                  <Form.Control asChild>
                    <input
                      className='box-border w-full bg-red-500 shadow-white inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-white shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_white] focus:shadow-[0_0_0_2px_white] selection:color-white selection:bg-white'
                      required
                    />
                  </Form.Control>
                </Form.Field>
                <Form.Field name='model' className='flex-1'>
                  <div className='flex items-baseline justify-between'>
                    <Form.Label className='leading-[35px]'>Modelo</Form.Label>
                    <Form.Message
                      className='text-sm text-red-400 opacity-[0.8]'
                      match='valueMissing'
                    >
                      Por favor introduce un modelo
                    </Form.Message>
                  </div>
                  <Form.Control asChild>
                    <input
                      className='box-border w-full bg-red-500 shadow-white inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-white shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_white] focus:shadow-[0_0_0_2px_white] selection:color-white selection:bg-white'
                      required
                    />
                  </Form.Control>
                </Form.Field>
              </div>
              <div className='flex gap-1'>
                <Form.Field name='model_year' className='flex-1'>
                  <div className='flex items-baseline justify-between w-full'>
                    <Form.Label className='leading-[35px]'>
                      Año modelo
                    </Form.Label>
                    <Form.Message
                      className='text-sm text-red-400 opacity-[0.8]'
                      match='valueMissing'
                    >
                      Por favor introduce un año
                    </Form.Message>
                  </div>
                  <Form.Control asChild>
                    <input
                      className='box-border w-full bg-red-500 shadow-white inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-white shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_white] focus:shadow-[0_0_0_2px_white] selection:color-white selection:bg-white'
                      min={1900}
                      max={2024}
                      type='number'
                      required
                    />
                  </Form.Control>
                </Form.Field>
                <ToggleGroup.Root
                  type='single'
                  value={vType}
                  className='flex-1 flex justify-center items-center relative top-4 gap-4 text-xl'
                  onValueChange={value => {
                    if (value) setVType(value);
                  }}
                  aria-label='Vehicle type'
                >
                  <ToggleGroup.Item
                    value='Carro'
                    className={classItems}
                    aria-label='"Carro" type'
                  >
                    <CarIcon />
                    Carro
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value='Moto'
                    className={classItems}
                    aria-label='"Moto" type'
                  >
                    <MotorcycleIcon />
                    Moto
                  </ToggleGroup.Item>
                </ToggleGroup.Root>
              </div>
              <div className='flex gap-1'>
                <Form.Field name='owner' className='flex-1'>
                  <div className='flex items-baseline justify-between'>
                    <Form.Label className='leading-[35px]'>
                      Cedula del dueño
                    </Form.Label>
                    <Form.Message
                      className='text-sm text-red-400 opacity-[0.8]'
                      match='valueMissing'
                    >
                      Por favor introduce una cedula
                    </Form.Message>
                    <Form.Message
                      className='text-sm text-red-400 opacity-[0.8]'
                      match={async value => {
                        const res = await getCitizenByCedula(parseInt(value));
                        return res.result === null;
                      }}
                    >
                      Por favor introduce una cedula registrada
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
                <Form.Field name='plate' className='flex-1'>
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
              </div>
              <div className='flex gap-1'>
                <Form.Field name='soat_end' className='flex-1'>
                  <div className='flex items-baseline justify-between'>
                    <Form.Label className='leading-[35px]'>
                      Fecha de vencimiento del soat
                    </Form.Label>
                    <Form.Message
                      className='text-sm text-red-400 opacity-[0.8]'
                      match='valueMissing'
                    >
                      Por favor introduce una fecha
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
                <Form.Field name='tech_end' className='flex-1'>
                  <div className='flex items-baseline justify-between'>
                    <Form.Label className='leading-[35px]'>
                      Fecha de vencimiento técnico mecánica
                    </Form.Label>
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
                      type='date'
                      required
                    />
                  </Form.Control>
                </Form.Field>
              </div>
              <div className='flex gap-1'>
                <Form.Field name='image_url' className='flex-[3]'>
                  <div className='flex items-baseline justify-between'>
                    <Form.Label className='leading-[35px]'>
                      URL Imagen
                    </Form.Label>
                    <Form.Message
                      className='text-sm text-red-400 opacity-[0.8]'
                      match='valueMissing'
                    >
                      Por favor introduce un url
                    </Form.Message>
                    <Form.Message
                      className='text-sm text-red-400 opacity-[0.8]'
                      match={async value => !(await checkImageUrl(value))}
                    >
                      Por favor introduce un url valido
                    </Form.Message>
                  </div>
                  <Form.Control asChild>
                    <input
                      className='box-border w-full bg-red-500 shadow-white inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-white shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_white] focus:shadow-[0_0_0_2px_white] selection:color-white selection:bg-white'
                      required
                    />
                  </Form.Control>
                </Form.Field>
                <div className='flex justify-center flex-[2]'>
                  <Form.Field name='color' className='flex-1'>
                    <div className='flex items-baseline justify-between'>
                      <Form.Label className='leading-[35px]'>Color</Form.Label>
                      <Form.Message
                        className='text-sm text-red-400 opacity-[0.8]'
                        match='valueMissing'
                      >
                        Por favor introduce un color
                      </Form.Message>
                    </div>
                    <Form.Control asChild>
                      <input
                        className='box-border w-full bg-red-500 shadow-white inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-white shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_white] focus:shadow-[0_0_0_2px_white] selection:color-white selection:bg-white'
                        type='color'
                        required
                      />
                    </Form.Control>
                  </Form.Field>
                </div>
              </div>
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
export default NewVehicleForm;
