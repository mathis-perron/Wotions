import { doc, onSnapshot } from 'firebase/firestore';
import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import Spinner from '@/components/spinner/Spinner';
import { db } from '@/configs/firebase';
import UserPage from '@/features/users/UserPage';
import type { IUser } from '@/types';

interface SingleUserPageProps {}

const SingleUserPage: React.FC<SingleUserPageProps> = () => {
  const router = useRouter();
  const userId = router.query.user;
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    if (userId) {
      onSnapshot(doc(db, 'users', userId as string), (snapshot) => {
        setUser(snapshot.data() as IUser);
      });
    }
  }, [db]);

  return user ? (
    <>
      <Head>
        <title>{user.username} | Wotions</title>
      </Head>
      <UserPage user={user} userId={userId as string} />
    </>
  ) : (
    <div className="flex h-screen w-screen items-center justify-center">
      <Spinner />
    </div>
  );
};

export default SingleUserPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
};
