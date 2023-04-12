import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

import {
  isChildrenPageActive,
  isParentPageActive,
} from '@/utils/dynamicNavigation';

import { navContent } from './navContent';

interface NavbarMobileProps {
  onClose: () => void;
}

const NavbarMobile: React.FC<NavbarMobileProps> = ({ onClose }) => {
  const route = useRouter();

  const [isCollapse, setCollapse] = useState<number | null>(null);

  const mobileCollapse = (id: number) => {
    if (isCollapse === id) {
      return setCollapse(null);
    }
    return setCollapse(id);
  };

  return (
    <nav className="w-full">
      <ul className="flex flex-col lg:flex-row">
        {navContent.map((item) => {
          if (!item.pages) {
            return (
              <li className="group" onClick={onClose} key={item.id}>
                <Link href={item.path}>
                  <button className="flex items-center justify-between py-3.5 font-display text-base text-jacarta-700 hover:text-accent focus:text-accent dark:text-white dark:hover:text-accent dark:focus:text-accent lg:px-5">
                    <span
                      className={
                        isChildrenPageActive({
                          path: item.path,
                          match: route.asPath,
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
          }
          return (
            <li className="js-nav-dropdown group relative" key={item.id}>
              <button
                onClick={() => mobileCollapse(item.id)}
                className="dropdown-toggle flex w-full items-center justify-between py-3.5 font-display text-base text-jacarta-700 hover:text-accent focus:text-accent dark:text-white dark:hover:text-accent dark:focus:text-accent lg:px-5"
              >
                <span
                  className={
                    isParentPageActive({
                      pages: item.pages,
                      path: route.asPath,
                    })
                      ? 'text-accent dark:text-accent'
                      : ''
                  }
                >
                  {item.name}
                </span>
                <i className="lg:hidden">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width={24}
                    height={24}
                    className="h-4 w-4 dark:fill-white"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z" />
                  </svg>
                </i>
              </button>
              <ul
                className={`dropdown-menu rounded-xl relative left-0 top-[85%] z-10 grid-flow-row grid-cols-[repeat(2,_1fr)] gap-x-4 whitespace-nowrap bg-white transition-all will-change-transform group-hover:visible group-hover:opacity-100 dark:bg-jacarta-800 lg:invisible lg:absolute lg:!grid lg:translate-y-4 lg:py-8 lg:px-2 lg:opacity-0 lg:shadow-2xl lg:group-hover:translate-y-2 ${
                  isCollapse === item.id ? 'block' : 'hidden'
                }`}
                aria-labelledby={`navDropdown-${item.id}`}
              >
                {item.pages.map((page) => (
                  <li key={page.id} onClick={onClose}>
                    <Link
                      href={page.path}
                      className="rounded-xl flex items-center px-5 py-2 transition-colors hover:bg-jacarta-50 hover:text-accent focus:text-accent dark:hover:bg-jacarta-600"
                    >
                      <span className="rounded-xl mr-3 bg-light-base p-[0.375rem]">
                        {page.icon}
                      </span>
                      <span className="font-display text-sm text-jacarta-700 dark:text-white">
                        {page.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavbarMobile;
