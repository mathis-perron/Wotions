import Link from 'next/link';
import Moment from 'react-moment';

import type { IArticle } from '@/types';

interface FirstItemProps {
  article: IArticle;
}

const FirstItem: React.FC<FirstItemProps> = ({ article }) => {
  return (
    <article className="mb-[1.875rem] md:mb-16">
      <div className="rounded-2xl flex h-[28.375rem] flex-col overflow-hidden border border-jacarta-100 transition-shadow hover:shadow-lg md:flex-row">
        <figure className="group flex  justify-center overflow-hidden md:w-1/2">
          <Link href={`/articles/${article.id}`}>
            <img
              src={article.cover}
              alt="article_1"
              className="h-full w-full object-cover transition-transform duration-[1600ms] will-change-transform group-hover:scale-105"
            />
          </Link>
        </figure>

        {/* <!-- Body --> */}
        <div className="rounded-b-[1.25rem] bg-white p-[10%] md:w-1/2 md:rounded-none md:rounded-r-[1.25rem]">
          {/* <!-- Meta --> */}
          <Link
            href={`/user/${article.user.id}`}
            className="mb-3 flex flex-wrap items-center space-x-1 font-display text-xs text-jacarta-700 hover:text-accent dark:text-jacarta-200"
          >
            {article.user.username}
          </Link>

          <h2 className="mb-4 font-display text-xl text-jacarta-700 hover:text-accent dark:text-white dark:hover:text-accent sm:text-3xl">
            <Link href={`/articles/${article.id}`}>{article.title}</Link>
          </h2>

          {/* <!-- Date / Time --> */}
          <span className="text-sm text-jacarta-400">
            <Moment fromNow>{article.timestamp.toDate()}</Moment>
          </span>
        </div>
      </div>
    </article>
  );
};

export default FirstItem;
