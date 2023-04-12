import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import Spinner from '@/components/spinner/Spinner';
import { db } from '@/configs/firebase';
import SingleArticlePage from '@/features/articles/SingleArticlePage';
import type { IArticle } from '@/types';

interface SingleArticleProps {}

const SingleArticle: React.FC<SingleArticleProps> = () => {
  const router = useRouter();
  const articleId = router.query.article;
  const [article, setArticle] = useState<IArticle | null>(null);

  useEffect(() => {
    if (articleId) {
      onSnapshot(doc(db, 'articles', articleId as string), async (snapshot) => {
        const user = await getDoc(doc(db, 'users', snapshot?.data()?.userID));
        const res = {
          content: snapshot?.data()?.content,
          cover: snapshot?.data()?.cover,
          timestamp: snapshot?.data()?.timestamp,
          title: snapshot?.data()?.title,
          user: user.data(),
        };
        setArticle(res);
      });
    }
  }, [db, articleId]);

  return article ? (
    <>
      <Head>
        <title>{article.title} | Wotions</title>
      </Head>
      <SingleArticlePage article={article} />
    </>
  ) : (
    <div className="flex h-screen w-screen items-center justify-center">
      <Spinner />
    </div>
  );
};

export default SingleArticle;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
};
