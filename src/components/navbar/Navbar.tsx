import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import { isChildrenPageActive } from '@/utils/dynamicNavigation';

import { navContent } from './navContent';

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  const router = useRouter();
  const session = useSession();

  return (
    <div className="invisible fixed inset-0 z-10 ml-auto items-center bg-white opacity-0 dark:bg-jacarta-800 lg:visible lg:relative lg:inset-auto lg:flex lg:bg-transparent lg:opacity-100 dark:lg:bg-transparent">
      <nav className="w-full">
        <ul className="flex flex-col lg:flex-row">
          {navContent.map((item) => {
            if (item.authNeeded && session.status === 'unauthenticated') {
              return <></>;
            }
            return (
              <li className="group" key={item.id}>
                <Link href={item.path}>
                  <button className="flex items-center justify-between py-3.5 font-display text-base text-jacarta-700 hover:text-accent focus:text-accent dark:text-white dark:hover:text-accent dark:focus:text-accent lg:px-5">
                    <span
                      className={
                        isChildrenPageActive({
                          path: router.asPath,
                          match: item.path,
                        })
                          ? 'text-accent dark:text-accent'
                          : ''
                      }
                    >
                      {item.name}
                    </span>
                  </button>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
