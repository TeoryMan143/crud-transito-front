import type { SVGProps } from 'react';

export function UserListIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='1em'
      height='1em'
      viewBox='0 0 24 24'
      {...props}
    >
      <path
        fill='currentColor'
        d='M14 7V5h8v2h-8Zm0 4V9h8v2h-8Zm0 4v-2h8v2h-8Zm-6-1q-1.25 0-2.125-.875T5 11q0-1.25.875-2.125T8 8q1.25 0 2.125.875T11 11q0 1.25-.875 2.125T8 14Zm-6 6v-1.9q0-.525.25-1t.7-.75q1.125-.675 2.388-1.012T8 15q1.4 0 2.663.338t2.387 1.012q.45.275.7.75t.25 1V20H2Z'
      />
    </svg>
  );
}
