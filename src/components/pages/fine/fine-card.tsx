import { useEffect, useState } from 'react';
import { getFineInfo } from '../../../lib/get-info';
import type { Fine, FineInfo } from '../../../lib/types';

interface Props {
  fineInfo: FineInfo;
}

function FineCard({ fineInfo }: Props) {
  return (
    <a
      href={`fine/${fineInfo.id}`}
      className='max-w-md border-2 border-red-500 rounded-xl p-4 hover:shadow-lg hover:scale-[1.01] transition-transform'
    >
      {!fineInfo ? (
        <p>Loading</p>
      ) : (
        <>
          <h4 className='font-bold font-outfit text-lg text-red-500'>
            {fineInfo.dateAdded.toLocaleString('es-CO', {
              dateStyle: 'medium',
            })}
          </h4>
          <ul className='mt-2'>
            <li>
              <strong>Razon:</strong> {fineInfo.reason}
            </li>
            <li>
              <strong>Cedula:</strong> {fineInfo.cedula}
            </li>
            <li>
              <strong>Placa:</strong> {fineInfo.plate}
            </li>
          </ul>
        </>
      )}
    </a>
  );
}
export default FineCard;
