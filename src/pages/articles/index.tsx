import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import { getSession } from 'next-auth/react';

import ArticlesListPage from '@/features/articles/ArticlesListPage';

interface ArticlesProps {}

const Articles: React.FC<ArticlesProps> = () => {
  return (
    <>
      <Head>
        <title>Articles | Wotions</title>
      </Head>
      <ArticlesListPage />
    </>
  );
};

export default Articles;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
};
