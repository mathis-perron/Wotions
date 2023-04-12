import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { convert } from 'html-to-text';
import Image from 'next/image';
import { title } from 'process';
import { useEffect, useState } from 'react';

import ArticleItem from '@/components/articles/article_item';
import { FacebookIcon } from '@/components/icons/FacebookIcon';
import { TwitterIcon } from '@/components/icons/TwitterIcon';
import { WebsiteIcon } from '@/components/icons/WebsiteIcon';
import { db } from '@/configs/firebase';
import type { IArticle, IUser } from '@/types';

interface UserPageProps {
  user: IUser;
  userId: string;
}

const UserPage: React.FC<UserPageProps> = ({ user, userId }) => {
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, 'articles'),
          orderBy('timestamp', 'desc'),
          where('userID', '==', userId),
          limit(7)
        ),
        async (snapshot) => {
          const res: IArticle[] = [];
          snapshot.docs.forEach((item) => {
            res.push({
              id: item.id,
              content: convert(item.data().content),
              cover: item.data().cover,
              timestamp: item.data().timestamp,
              title: item.data().title,
              user,
            });
          });
          setArticles(res);
          setLoading(false);
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
        where('userID', '==', userId),
        limit(6),
        orderBy('timestamp', 'desc')
      ),
      async (snapshot) => {
        const res: IArticle[] = articles;
        snapshot.docs.forEach((item) => {
          res.push({
            id: item.id,
            content: convert(item.data().content),
            cover: item.data().cover,
            timestamp: item.data().timestamp,
            title: item.data().title,
            user,
          });
        });
        setArticles(res);
        setLoading(false);
      }
    );
  };

  return (
    <div className="pt-[5.5rem] lg:pt-24">
      <section className="relative bg-light-base py-16 pb-12 dark:bg-jacarta-800 md:py-24">
        {/* <!-- Avatar --> */}
        <div className="z-10 flex items-center justify-center">
          <figure className="rounded-xl relative h-40 w-40 border-[5px] border-white dark:border-jacarta-600">
            <Image
              src={user.image}
              alt={title}
              layout="fill"
              className="rounded-xl border-[5px] border-white object-cover dark:border-jacarta-600"
            />
          </figure>
        </div>

        <div className="container">
          <div className="pt-10 text-center">
            <h2 className="mb-2 font-display text-4xl font-medium text-jacarta-700 dark:text-white">
              {user.username}
            </h2>

            <p className="mx-auto mb-2 max-w-xl text-lg dark:text-jacarta-300">
              {user.bio}
            </p>

            <span className="text-jacarta-400">Joined December 2022</span>

            <div className="relative mt-6 flex items-center justify-center space-x-2.5">
              {/* Facebook */}
              {user.facebook && (
                <div className="rounded-xl border border-jacarta-100 bg-white hover:bg-jacarta-100 dark:border-jacarta-600 dark:bg-jacarta-700 dark:hover:bg-jacarta-600">
                  <div className="relative inline-flex h-10 w-10 cursor-pointer items-center justify-center text-sm">
                    <button onClick={() => window.open(user.facebook)}>
                      <FacebookIcon className="h-4 w-4 fill-jacarta-500 dark:fill-jacarta-200" />
                    </button>
                  </div>
                </div>
              )}

              {/* Twitter */}
              {user.twitter && (
                <div className="rounded-xl border border-jacarta-100 bg-white hover:bg-jacarta-100 dark:border-jacarta-600 dark:bg-jacarta-700 dark:hover:bg-jacarta-600">
                  <div className="relative inline-flex h-10 w-10 cursor-pointer items-center justify-center text-sm">
                    <button onClick={() => window.open(user.twitter)}>
                      <TwitterIcon className="h-4 w-4 fill-jacarta-500 dark:fill-jacarta-200" />
                    </button>
                  </div>
                </div>
              )}

              {/* Website */}
              {user.website && (
                <div className="rounded-xl border border-jacarta-100 bg-white hover:bg-jacarta-100 dark:border-jacarta-600 dark:bg-jacarta-700 dark:hover:bg-jacarta-600">
                  <div className="relative inline-flex h-10 w-10 cursor-pointer items-center justify-center text-sm">
                    <button onClick={() => window.open(user.website)}>
                      <WebsiteIcon className="h-4 w-4 fill-jacarta-500 dark:fill-jacarta-200" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <div className="relative py-24">
        <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
          {/* <img src="img/gradient_light.jpg" alt="gradient" className="h-full w-full" /> */}
          <Image
            src="/images/gradient_light.jpg"
            alt="gradient"
            className="h-full w-full"
            layout="fill"
          />
        </picture>

        <div className="container">
          <div className="grid grid-cols-1 gap-[1.875rem] sm:grid-cols-2 md:grid-cols-3">
            {articles
              .filter((_, index) => index !== 0)
              .map((article, index) => {
                return <ArticleItem key={index} article={article} />;
              })}
          </div>

          {/* TODO: Loading */}
          {loading ? <>Loading</> : <></>}

          <div className="mt-10 text-center">
            <button
              onClick={() => handleLoadMore()}
              className="inline-block rounded-full bg-accent py-3 px-8 text-center font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark"
            >
              Load More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
