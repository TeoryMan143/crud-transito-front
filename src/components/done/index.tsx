import styles from './styles.module.css';

function DoneAni() {
  return (
    <svg
      width='1em'
      height='1em'
      viewBox='0 0 50 50'
      xmlns='http://www.w3.org/2000/svg'
      className='text-6xl text-red-500'
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
  );
}
export default DoneAni;
