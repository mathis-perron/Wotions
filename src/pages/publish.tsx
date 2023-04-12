import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import { getSession } from 'next-auth/react';

import IsAuth from '@/features/auth/IsAuth';
import PublishPage from '@/features/publish/PublishPage';

interface PublishProps {}

const Publish: React.FC<PublishProps> = () => {
  return (
    <IsAuth>
      <Head>
        <title>Publish | Wotions</title>
      </Head>
      <PublishPage />
    </IsAuth>
  );
};

export default Publish;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
};
