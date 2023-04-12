import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import { getSession } from 'next-auth/react';

import IsAuth from '@/features/auth/IsAuth';
import SettingsPage from '@/features/settings/SettingsPage';

interface ProfileProps {}

const Profile: React.FC<ProfileProps> = () => {
  return (
    <IsAuth>
      <Head>
        <title>Settings | Wotions</title>
      </Head>
      <SettingsPage />
    </IsAuth>
  );
};

export default Profile;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
};
