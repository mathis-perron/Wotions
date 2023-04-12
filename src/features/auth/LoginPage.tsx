import Link from 'next/link';
import type { BuiltInProviderType } from 'next-auth/providers';
import type { ClientSafeProvider, LiteralUnion } from 'next-auth/react';
import { signIn } from 'next-auth/react';

interface LoginPageProps {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  >;
}

const LoginPage: React.FC<LoginPageProps> = ({ providers }) => {
  return (
    <section className="relative h-screen">
      <div className="lg:flex lg:h-full">
        {/* <!-- Left --> */}
        <div className="relative text-center lg:w-1/2">
          <img
            src="/images/login.jpg"
            alt="login"
            className="absolute h-full w-full object-cover"
          />
          {/* <!-- Logo --> */}
          <Link href="/" className="relative inline-block py-36">
            <img
              src="/images/logo_white.png"
              className="inline-block max-h-7"
              alt="Xhibiter | NFT Marketplace"
            />
          </Link>
        </div>
        {/* <!-- Right --> */}
        <div className="relative flex items-center justify-center p-[10%] lg:w-1/2">
          <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
            <img
              src="/images/gradient_light.jpg"
              alt="gradient"
              className="h-full w-full"
            />
          </picture>
          <div className="w-full max-w-[25.625rem] text-center">
            <h1 className="mb-6 font-display text-4xl text-jacarta-700 dark:text-white">
              Sign in
            </h1>
            <p className="mb-10 text-lg leading-normal dark:text-jacarta-300">
              Choose one of available wallet providers or create a new wallet.
              <a href="#" className="text-accent">
                What is a wallet?
              </a>
            </p>
            {Object.values(providers).map((provider) => (
              <button
                key={provider.name}
                onClick={() => signIn(provider.id)}
                className="mb-4 flex w-full items-center justify-center rounded-full border-2 border-jacarta-100 bg-white py-4 px-8 text-center font-semibold text-jacarta-700 transition-all hover:border-transparent hover:bg-accent hover:text-white dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white dark:hover:border-transparent dark:hover:bg-accent"
              >
                Sign in with {provider.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
