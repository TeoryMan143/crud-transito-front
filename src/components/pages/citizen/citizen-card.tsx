import type { Citizen } from '../../../lib/types';

interface Props {
  citizen: Citizen;
}

function CitizenCard({ citizen }: Props) {
  const { name, lastName, birthDay, cedula, address, licenceEnd, id } = citizen;
  const licenceExp = licenceEnd.getTime() < new Date().getTime();

  return (
    <a
      href={`citizen/${id}`}
      className='max-w-md border-2 border-red-500 rounded-xl p-4 hover:shadow-lg hover:scale-[1.01] transition-transform'
    >
      <h4 className='font-bold font-outfit text-lg text-red-500'>
        {`${name} ${lastName}`}
      </h4>

      <ul className='mt-2'>
        <li>
          <strong>Cedula: </strong> {cedula}
        </li>
        <li>
          <strong>Fecha de nacimiento: </strong>
          {birthDay.toLocaleString('es-CO', { dateStyle: 'medium' })}
        </li>

        <li className={`${licenceExp && 'text-red-500'}`}>
          <strong>Licencia vence: </strong>
          {licenceEnd.toLocaleString('es-CO', { dateStyle: 'medium' })}
          {licenceExp && <span className='text-xl'>*</span>}
        </li>
        <li>
          <strong>Dirección: </strong>
          {address}
        </li>
      </ul>
    </a>
  );
}
export default CitizenCard;
