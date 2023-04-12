import Link from 'next/link';
import { useSession } from 'next-auth/react';

import { ClearIcon } from '../icons/ClearIcon';
import Logo from '../logo/Logo';
import NavbarMobile from '../navbar/NavbarMobile';
import SearchBarMenu from '../searchbar/SearchBarMenu';

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const Menu: React.FC<MenuProps> = ({ isOpen, onClose }) => {
  const { data } = useSession();

  return (
    <div
      className={`invisible fixed inset-0 z-20 ml-auto items-center bg-white opacity-0 dark:bg-jacarta-800 lg:visible lg:relative lg:inset-auto lg:hidden lg:bg-transparent lg:opacity-100 dark:lg:bg-transparent ${
        isOpen ? 'nav-menu--is-open' : 'hidden'
      }`}
    >
      <div className="fixed left-0 z-10 flex w-full items-center justify-between bg-white p-6 dark:bg-jacarta-800 lg:hidden">
        <div className="dark:hidden">
          <Logo height={28} width={130} className="h-auto max-h-7" />
        </div>
        <div className="hidden dark:block">
          <Logo white height={28} width={130} />
        </div>

        <button
          className="group ml-2 flex h-10 w-10 items-center justify-center rounded-full border border-jacarta-100 bg-white transition-colors hover:border-transparent hover:bg-accent focus:border-transparent focus:bg-accent dark:border-transparent dark:bg-white/[.15] dark:hover:bg-accent"
          onClick={onClose}
        >
          <ClearIcon className="h-4 w-4 fill-jacarta-700 transition-colors group-hover:fill-white group-focus:fill-white dark:fill-white" />
        </button>
      </div>

      <SearchBarMenu />

      <NavbarMobile onClose={onClose} />

      <div className="mt-10 flex h-full w-full flex-col justify-between lg:hidden">
        {data?.user ? (
          <div />
        ) : (
          <Link
            href="/login"
            className="block w-full rounded-full bg-accent py-3 px-8 text-center font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark"
          >
            Sign In / Sign Up
          </Link>
        )}

        <div className="flex w-full flex-col items-center">
          <ul className="flex flex-wrap space-x-4 text-sm dark:text-jacarta-400">
            <li>
              <Link
                href="/legal/conditions"
                className="hover:text-accent dark:hover:text-white"
                onClick={onClose}
              >
                Terms and conditions
              </Link>
            </li>
            <li>
              <Link
                href="/legal/policy"
                className="hover:text-accent dark:hover:text-white"
                onClick={onClose}
              >
                Privacy policy
              </Link>
            </li>
          </ul>

          <span className="text-sm dark:text-jacarta-400">
            <span>© {new Date().getFullYear()} Wotions</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Menu;
