import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

import { LogoutIcon } from '../icons/LogoutIcon';
import { UserIcon } from '../icons/UserIcon';

interface ProfileButtonProps {
  name: string;
  image: string | null | undefined;
}

const ProfileButton: React.FC<ProfileButtonProps> = ({ name, image }) => {
  // const { theme, setTheme } = useTheme();
  // const toggle = () => {
  //   if (theme === 'light') setTheme('dark');
  //   else setTheme('light');
  // };

  const { data } = useSession();

  return (
    <div className="ml-8 hidden items-center lg:flex xl:ml-12">
      <div className="js-nav-dropdown group-dropdown relative">
        <button className="dropdown-toggle group ml-2 flex h-10 w-10 items-center justify-center rounded-full border border-jacarta-100 bg-white transition-colors hover:border-transparent hover:bg-accent focus:border-transparent focus:bg-accent dark:border-transparent dark:bg-white/[.15] dark:hover:bg-accent">
          {image ? (
            <img
              src={image}
              alt="avatar"
              className="h-full w-full rounded-full"
            />
          ) : (
            <UserIcon className="h-4 w-4 fill-jacarta-700 transition-colors group-hover:fill-white group-focus:fill-white dark:fill-white" />
          )}
        </button>
        <div className="dropdown-menu group-dropdown-hover:opacity-100 group-dropdown-hover:visible rounded-xl !-right-4 !top-[85%] !left-auto z-10 hidden min-w-[14rem] whitespace-nowrap bg-white transition-all will-change-transform before:absolute before:-top-3 before:h-3 before:w-full dark:bg-jacarta-800 lg:invisible lg:absolute lg:grid lg:!translate-y-4 lg:py-4 lg:px-2 lg:opacity-0 lg:shadow-2xl">
          <div>
            <button className="my-4 flex select-none items-center whitespace-nowrap px-5 font-display leading-none text-jacarta-700 dark:text-white">
              <span>{name}</span>
            </button>
          </div>
          {/* USER PROFILE */}
          {/* TODO: User redirect */}
          <Link
            href={`/user/${data?.user.id}`}
            className="rounded-xl flex items-center space-x-2 px-5 py-2 transition-colors hover:bg-jacarta-50 hover:text-accent focus:text-accent dark:hover:bg-jacarta-600"
          >
            <UserIcon className="h-4 w-4 fill-jacarta-700 transition-colors dark:fill-white" />
            <span className="mt-1 font-display text-sm text-jacarta-700 dark:text-white">
              My Profile
            </span>
          </Link>

          {/* Settings */}
          <Link
            href="/settings"
            className="rounded-xl flex items-center space-x-2 px-5 py-2 transition-colors hover:bg-jacarta-50 hover:text-accent focus:text-accent dark:hover:bg-jacarta-600"
          >
            <UserIcon className="h-4 w-4 fill-jacarta-700 transition-colors dark:fill-white" />
            <span className="mt-1 font-display text-sm text-jacarta-700 dark:text-white">
              Settings
            </span>
          </Link>

          {/* LIGHT/DARK MODE */}
          {/* <button
            onClick={toggle}
            className="rounded-xl flex items-center space-x-2 px-5 py-2 transition-colors hover:bg-jacarta-50 hover:text-accent focus:text-accent dark:hover:bg-jacarta-600"
          >
            <MoonIcon className="h-4 w-4 fill-jacarta-700 transition-colors group-hover:fill-white group-focus:fill-white dark:fill-white" />
            <span className="mt-1 font-display text-sm text-jacarta-700 dark:text-white">
              Dark Mode
            </span>
          </button> */}

          {/* LOGOUT */}
          <button
            className="rounded-xl flex items-center space-x-2 px-5 py-2 transition-colors hover:bg-jacarta-50 hover:text-accent focus:text-accent dark:hover:bg-jacarta-600"
            onClick={() => signOut()}
          >
            <LogoutIcon className="h-4 w-4 stroke-jacarta-700 transition-colors dark:stroke-white" />
            <span className="mt-1 font-display text-sm text-jacarta-700 dark:text-white">
              Sign out
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileButton;
