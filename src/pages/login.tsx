import Head from 'next/head';
import type { BuiltInProviderType } from 'next-auth/providers';
import type { ClientSafeProvider, LiteralUnion } from 'next-auth/react';
import { getProviders, getSession } from 'next-auth/react';

import IsNotAuth from '@/features/auth/IsNotAuth';
import LoginPage from '@/features/auth/LoginPage';

interface LoginProps {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  >;
}

const Login: React.FC<LoginProps> = ({ providers }) => {
  return (
    <IsNotAuth>
      <Head>
        <title>Login | Wotions</title>
      </Head>
      <LoginPage providers={providers} />
    </IsNotAuth>
  );
};

export default Login;

export async function getServerSideProps(context: any) {
  const { req, res } = context;
  const providers = await getProviders();

  const session = await getSession({ req });

  if (session && res) {
    res.statusCode = 302;
    res.setHeader('Location', '/');
    return {
      props: {
        session,
        providers,
      },
    };
  }

  return {
    props: {
      providers,
    },
  };
}
