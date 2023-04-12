import {
  collection,
  documentId,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { convert } from 'html-to-text';
import { useEffect, useState } from 'react';

import ArticleItem from '@/components/articles/article_item';
import FirstItem from '@/components/articles/first_item';
import Spinner from '@/components/spinner/Spinner';
import { db } from '@/configs/firebase';
import type { IArticle } from '@/types';

interface ArticlesListPageProps {}

const ArticlesListPage: React.FC<ArticlesListPageProps> = () => {
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [firstLoading, setFirstLoading] = useState<boolean>(true);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, 'articles'),
          orderBy('timestamp', 'desc'),
          limit(7)
        ),
        async (snapshot) => {
          // Get all user id
          const userIdList = await snapshot.docs.map((r) => r.data().userID);
          const userList = await getDocs(
            query(
              collection(db, 'users'),
              where(documentId(), 'in', userIdList)
            )
          ).then((userDocList) =>
            userDocList.docs.map((res) => {
              return { id: res.id, ...res.data() };
            })
          );

          const res: IArticle[] = [];
          snapshot.docs.forEach((item) => {
            res.push({
              id: item.id,
              content: convert(item.data().content),
              cover: item.data().cover,
              timestamp: item.data().timestamp,
              title: item.data().title,
              user: userList.find(
                (resUser) => resUser.id === item.data().userID
              ),
            });
          });
          setArticles(res);
          setFirstLoading(false);
        }
      ),
    [db]
  );

  // TODO: Resolve if no more articles
  const handleLoadMore = () => {
    setLoading(true);
    onSnapshot(
      query(
        collection(db, 'articles'),
        where('timestamp', '<', articles[articles.length - 1]?.timestamp),
        limit(6),
        orderBy('timestamp', 'desc')
      ),
      async (snapshot) => {
        // Get all user id
        const userIdList = await snapshot.docs.map((r) => r.data().userID);
        const userList = await getDocs(
          query(collection(db, 'users'), where(documentId(), 'in', userIdList))
        ).then((userDocList) =>
          userDocList.docs.map((res) => {
            return { id: res.id, ...res.data() };
          })
        );

        const res: IArticle[] = articles;
        snapshot.docs.forEach((item) => {
          res.push({
            id: item.id,
            content: item.data().content,
            cover: item.data().cover,
            timestamp: item.data().timestamp,
            title: item.data().title,
            user: userList.find((resUser) => resUser.id === item.data().userID),
          });
        });
        setArticles(res);
        setLoading(false);
      }
    );
  };

  return firstLoading ? (
    <div className="flex h-screen w-screen items-center justify-center">
      <Spinner />
    </div>
  ) : (
    <section className="relative pt-[5.5rem] lg:pt-24">
      {/* TODO: Filter list */}
      <div className="py-16 md:py-24">
        <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
          <img
            src="/images/gradient_light.jpg"
            alt="gradient"
            className="h-full w-full"
          />
        </picture>
        <div className="container">
          {articles[0] && <FirstItem article={articles[0]} />}
          <div className="grid grid-cols-1 gap-[1.875rem] sm:grid-cols-2 md:grid-cols-3">
            {articles
              .filter((_, index) => index !== 0)
              .map((article, index) => {
                return <ArticleItem key={index} article={article} />;
              })}
          </div>

          {/* TODO: Resolve if last article */}
          <div className="mt-10 text-center">
            {loading ? (
              <Spinner />
            ) : (
              <button
                onClick={() => handleLoadMore()}
                className="inline-block rounded-full bg-accent py-3 px-8 text-center font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark"
              >
                Load More
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArticlesListPage;
