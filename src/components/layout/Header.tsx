import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import IconButton from '../iconButton/IconButton';
import ProfileButton from '../iconButton/ProfileButton';
import { MenuIcon } from '../icons/MenuIcon';
import { UserIcon } from '../icons/UserIcon';
import Logo from '../logo/Logo';
import Menu from '../menu/Menu';
import Navbar from '../navbar/Navbar';
import SearchBar from '../searchbar/SearchBar';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const router = useRouter();
  const { data } = useSession();

  const [toggle, setToggle] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1024) {
        setToggle(false);
      }
    });
  });

  return (
    <>
      <header className="fixed top-0 z-20 w-full backdrop-blur transition-colors">
        <div className="flex items-center p-6 xl:px-24">
          {/* <!-- Desktop --> */}
          <Link className="shrink-0" href="/">
            <Logo width={36} height={28} className="h-auto max-h-7" />
          </Link>

          {router.asPath !== '/' && <SearchBar />}
          <Navbar />

          {data?.user?.name ? (
            <ProfileButton name={data.user.name} image={data.user.image} />
          ) : (
            <Link
              href="/login"
              className="hidden rounded-full bg-accent py-3 px-8 text-center font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark lg:flex"
            >
              Sign In / Sign Up
            </Link>
          )}

          {/* <!-- Mobile --> */}
          <div className="ml-auto flex lg:hidden">
            {/* TODO: Redirect user */}
            <IconButton redirectURL="/profile/user_avatar" ariaLabel="profile">
              {data?.user?.image ? (
                <img
                  src={data.user.image}
                  alt="avatar"
                  className="h-full w-full rounded-full"
                />
              ) : (
                <UserIcon className="h-4 w-4 fill-jacarta-700 transition-colors group-hover:fill-white group-focus:fill-white dark:fill-white" />
              )}
            </IconButton>
            <IconButton
              onClick={() => setToggle(true)}
              ariaLabel="open mobile menu"
            >
              <MenuIcon className="h-4 w-4 fill-jacarta-700 transition-colors group-hover:fill-white group-focus:fill-white dark:fill-white" />
            </IconButton>
          </div>
        </div>
      </header>

      <Menu isOpen={toggle} onClose={() => setToggle(false)} />
    </>
  );
};

export default Header;
