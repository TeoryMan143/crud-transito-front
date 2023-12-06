import type { Vehicle } from '../../../lib/types';

interface Props {
  vehicle: Vehicle;
}

function VehicleCard({ vehicle }: Props) {
  const { model, plate, imageUrl, soatEnd, techEnd, color, id } = vehicle;

  const soatExp = soatEnd.getTime() < new Date().getTime();
  const techExp = techEnd.getTime() < new Date().getTime();

  return (
    <a
      href={`../vehicle/${id}`}
      className='max-w-[25rem] border-2 border-red-500 rounded-xl p-4 hover:shadow-lg hover:scale-[1.01] transition-transform flex gap-3 items-center'
    >
      <img
        className='aspect-square h-36 rounded-xl object-cover'
        src={imageUrl}
        alt={`${model} photo`}
      />
      <div className='py-2 h-full'>
        <div className='bg-red-500 w-[2px] h-full inline-block'></div>
      </div>
      <div>
        <h4 className='font-bold font-outfit text-lg text-red-500'>{model}</h4>
        <ul>
          <li>
            <strong>Placa: </strong>
            {plate}
          </li>
          <li className={`${soatExp && 'text-red-500'}`}>
            <strong>Soat vence: </strong>
            {soatEnd.toLocaleString('es-CO', { dateStyle: 'medium' })}
            {soatExp && <span className='text-xl'>*</span>}
          </li>
          <li className={`${techExp && 'text-red-500'}`}>
            <strong>Técnico mecánica vence: </strong>
            {techEnd.toLocaleString('es-CO', { dateStyle: 'medium' })}
            {techExp && <span className='text-xl'>*</span>}
          </li>
          <li>
            <strong>Color: </strong>
            <div
              className='inline-block h-3 w-3'
              style={{ backgroundColor: color }}
            ></div>
          </li>
        </ul>
      </div>
    </a>
  );
}
export default VehicleCard;
