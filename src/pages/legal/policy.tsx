import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import { getSession } from 'next-auth/react';

import PrivacyPolicyPage from '@/features/terms/PrivacyPolicyPage';

interface PrivacyPolicyProps {}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = () => {
  return (
    <>
      <Head>
        <title>Privacy policy | Wotions</title>
      </Head>
      <PrivacyPolicyPage />
    </>
  );
};

export default PrivacyPolicy;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
};
