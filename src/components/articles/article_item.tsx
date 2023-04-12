import moment from 'moment';
import Link from 'next/link';

import type { IArticle } from '@/types';

interface ArticleItemProps {
  article: IArticle;
}

const ArticleItem: React.FC<ArticleItemProps> = ({ article }) => {
  return (
    <article>
      <div className="rounded-2xl overflow-hidden border border-t-0 border-jacarta-100 transition-shadow hover:shadow-lg">
        {/* Cover */}
        <figure className="group h-[15.625rem] overflow-hidden">
          <Link href={`/articles/${article.id}`}>
            <img
              src={article.cover}
              alt={article.title}
              className="h-full w-full object-cover transition-transform duration-[1600ms] will-change-transform group-hover:scale-105 "
            />
          </Link>
        </figure>
        {/* Body */}
        <div className="flex h-52 flex-col justify-between rounded-b-[1.25rem] bg-white p-[10%] dark:border-jacarta-600 dark:bg-jacarta-700">
          <div>
            <div className="mb-3 flex flex-wrap items-center space-x-1 text-xs">
              <Link
                href={`/user/${article.user.id}`}
                className="font-display text-jacarta-700 hover:text-accent dark:text-jacarta-200"
              >
                {article.user.username}
              </Link>
            </div>

            <h2 className="mb-4 font-display text-xl text-jacarta-700 hover:text-accent dark:text-white dark:hover:text-accent sm:text-lg">
              <Link href={`/articles/${article.id}`}>{article.title}</Link>
            </h2>
          </div>

          {/* <!-- Date / Time --> */}
          <div className="flex flex-wrap items-center space-x-2 text-sm text-jacarta-400">
            <time>{moment().format('LLL')}</time>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ArticleItem;
