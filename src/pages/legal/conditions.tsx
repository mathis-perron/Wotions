import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import { getSession } from 'next-auth/react';

import ConditionsPage from '@/features/terms/ConditionsPage';

interface ConditionsProps {}

const Conditions: React.FC<ConditionsProps> = () => {
  return (
    <>
      <Head>
        <title>Conditions | Wotions</title>
      </Head>
      <ConditionsPage />
    </>
  );
};

export default Conditions;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
};
