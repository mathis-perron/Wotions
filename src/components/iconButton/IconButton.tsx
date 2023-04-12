import Link from 'next/link';
import type { ReactNode } from 'react';

interface Props {
  ariaLabel: string;
  onClick?: () => void;
  children: ReactNode;
  redirectURL?: string;
}

const IconButton = ({ ariaLabel, onClick, children, redirectURL }: Props) => {
  return redirectURL && !onClick ? (
    <Link
      href={redirectURL}
      className="group ml-2 flex h-10 w-10 items-center justify-center rounded-full border border-jacarta-100 bg-white transition-colors hover:border-transparent hover:bg-accent focus:border-transparent focus:bg-accent dark:border-transparent dark:bg-white/[.15] dark:hover:bg-accent"
      aria-label={ariaLabel}
    >
      {children}
    </Link>
  ) : (
    <button
      className="group ml-2 flex h-10 w-10 items-center justify-center rounded-full border border-jacarta-100 bg-white transition-colors hover:border-transparent hover:bg-accent focus:border-transparent focus:bg-accent dark:border-transparent dark:bg-white/[.15] dark:hover:bg-accent"
      aria-label={ariaLabel}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default IconButton;
