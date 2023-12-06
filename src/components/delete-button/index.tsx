import { useRef, useState } from 'react';
import { DeleteIcon } from '../icons/delete';
import { deleteCitizen, deleteFine, deleteVehicle } from '../../lib/api';
import { delay } from '../../lib/utils';
import type { APIres } from '../../lib/types';

interface Props {
  id: string;
  type: 'citizen' | 'vehicle' | 'fine';
}

function DeleteButton({ id, type }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleDelete = async () => {
    let res: APIres<null> | null = null;
    setLoading(true);
    if (type === 'citizen') {
      res = await deleteCitizen(id);
    } else if (type === 'vehicle') {
      res = await deleteVehicle(id);
    } else if (type === 'fine') {
      res = await deleteFine(id);
    }
    if (res?.error) {
      setLoading(false);
      setError(true);
      await delay(2000);
      dialogRef.current?.close();
      return;
    }
    await delay(1000);
    window.location.href = '/';
    setLoading(false);
  };

  return (
    <div>
      <button
        onClick={() => dialogRef.current?.showModal()}
        className='flex justify-center items-center gap-1
        text-white bg-red-500
          py-2 px-3 rounded-2xl 
          text-lg font-semibold font-outfit 
          transition-all hover:text-amber-200 hover:scale-[1.02]'
      >
        <DeleteIcon /> Eliminar
      </button>
      <dialog
        className=' p-5 border-2 border-amber-300 rounded-xl bg-amber-50'
        ref={dialogRef}
      >
        <h3 className='text-center text-4xl'>
          {error ? (
            <span className='text-red-500'>Ha ocurrido un error</span>
          ) : loading ? (
            'Cargando...'
          ) : (
            '¿Estas seguro?'
          )}
        </h3>
        <div className='pt-5 flex justify-center gap-3'>
          <button
            onClick={handleDelete}
            className='flex justify-center items-center gap-1
        text-white bg-red-500
          py-2 px-3 rounded-2xl 
          text-lg font-semibold font-outfit 
          transition-all hover:text-amber-200 hover:scale-[1.02]'
          >
            <DeleteIcon /> Eliminar
          </button>
          <button
            onClick={() => dialogRef.current?.close()}
            className='flex justify-center items-center gap-1
        text-white bg-amber-500
          py-2 px-3 rounded-2xl 
          text-lg font-semibold font-outfit 
          transition-transform hover:scale-[1.02]'
          >
            &times; Cancelar
          </button>
        </div>
      </dialog>
    </div>
  );
}
export default DeleteButton;
