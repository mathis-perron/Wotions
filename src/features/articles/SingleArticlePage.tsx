import { useEffect, useRef } from 'react';
import Moment from 'react-moment';

import { FacebookIcon } from '@/components/icons/FacebookIcon';
import { TwitterIcon } from '@/components/icons/TwitterIcon';
import { WebsiteIcon } from '@/components/icons/WebsiteIcon';
import type { IArticle } from '@/types';

interface SingleArticlePageProps {
  article: IArticle;
}

const SingleArticlePage: React.FC<SingleArticlePageProps> = ({ article }) => {
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      const refCurrent: HTMLElement = contentRef.current;
      refCurrent.innerHTML = article.content;
    }
  }, []);

  return (
    <div className="pt-[5.5rem] lg:pt-24">
      <section className="relative py-16 md:py-24">
        <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
          <img
            src="/images/gradient_light.jpg"
            alt="gradient"
            className="h-full w-full"
          />
        </picture>

        <div className="container">
          <header className="mx-auto mb-16 max-w-lg text-center">
            <h1 className="mb-4 font-display text-2xl text-jacarta-700 dark:text-white sm:text-5xl">
              {article.title}
            </h1>
            {/* <!-- Author --> */}
            <div className="inline-flex items-center">
              <img
                src={article.user.image}
                alt="author"
                className="mr-4 h-10 w-10 shrink-0 rounded-full"
              />

              <div className="text-left">
                <span className="text-2xs font-medium tracking-tight text-jacarta-700 dark:text-jacarta-200">
                  {article.user.username}
                </span>

                {/* <!-- Date / Time --> */}
                <div className="flex flex-wrap items-center space-x-2 text-sm text-jacarta-400">
                  <span>
                    <Moment fromNow>{article.timestamp.toDate()}</Moment>
                  </span>
                </div>
              </div>
            </div>
          </header>

          {/* <!-- Featured image --> */}
          <figure className="mb-16">
            <img
              src={article.cover}
              alt="article cover"
              className="rounded-2xl h-full max-h-[42.375rem] w-full object-contain"
            />
          </figure>

          {/* <!-- Article --> */}
          <article className="mb-12">
            {/* <!-- Content --> */}
            <div className="article-content">
              <div className="leading-normal" ref={contentRef} />
            </div>
          </article>

          {/* <!-- Author --> */}
          <div className="mx-auto max-w-[48.125rem]">
            <div className="rounded-2xl mb-16 flex border border-jacarta-100 bg-white p-8 dark:border-jacarta-600 dark:bg-jacarta-700">
              <img
                src={article.user.image}
                alt="author"
                className="mr-4 h-16 w-16 shrink-0 self-start rounded-lg object-cover md:mr-8 md:h-[9rem] md:w-[9rem]"
              />
              <div>
                <span className="mb-3 mt-2 block font-display text-base text-jacarta-700 dark:text-white">
                  {article.user.username}
                </span>
                <p className="mb-4 dark:text-jacarta-300">{article.user.bio}</p>
                <div className="flex space-x-5">
                  <button
                    onClick={() => window.open(article.user.facebook)}
                    className="group"
                  >
                    <FacebookIcon className="h-4 w-4 fill-jacarta-400 group-hover:fill-accent dark:group-hover:fill-white" />
                  </button>

                  <button
                    onClick={() => window.open(article.user.twitter)}
                    className="group"
                  >
                    <TwitterIcon className="h-4 w-4 fill-jacarta-400 group-hover:fill-accent dark:group-hover:fill-white" />
                  </button>

                  <button
                    onClick={() => window.open(article.user.webiste)}
                    className="group"
                  >
                    <WebsiteIcon className="h-4 w-4 fill-jacarta-400 group-hover:fill-accent dark:group-hover:fill-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SingleArticlePage;
