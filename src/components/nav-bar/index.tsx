import { useEffect, useState } from 'react';
import { UserListIcon } from '../icons/user';
import { CarIcon } from '../icons/car';
import { TicketIcon } from '../icons/ticket';
import { HomeIcon } from '../icons/home';
import './style.css';

function NavigationBar() {
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  return (
    <nav className='flex justify-center mt-6'>
      <ul className='flex font-outfit [&>li]:relative [&_a]:px-4 [&_a]:text-white [&_a]:text-xl hover:[&_a]:text-amber-300 [&_a]:transition-colors [&_a]:flex [&_a]:flex-col [&_a]:items-center [&_a]:text-center'>
        <li className={currentPath === '/' ? 'active' : undefined}>
          <a href='/'>
            <HomeIcon className='text-3xl' /> Inicio
          </a>
        </li>
        <li className={currentPath.includes('/citizen') ? 'active' : undefined}>
          <a href='/citizen'>
            <UserListIcon className='text-3xl' /> Ciudadanos
          </a>
        </li>
        <li className={currentPath.includes('/vehicle') ? 'active' : undefined}>
          <a href='#'>
            <CarIcon className='text-3xl' />
            Vehiculos
          </a>
        </li>
        <li className={currentPath.includes('/fine') ? 'active' : undefined}>
          <a href='#'>
            <TicketIcon className='text-3xl' />
            Multas
          </a>
        </li>
      </ul>
    </nav>
  );
  // ...
}

export default NavigationBar;
