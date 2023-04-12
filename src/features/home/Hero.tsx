const Hero = () => {
  return (
    <div className="pb-20">
      {/* <!-- Hero --> */}
      <picture className="pointer-events-none absolute inset-x-0 top-0 -z-10 dark:hidden">
        <img src="/images/gradient.jpg" alt="gradient" />
      </picture>
      <picture className="pointer-events-none absolute inset-x-0 top-0 -z-10 hidden dark:block">
        <img src="/images/gradient_dark.jpg" alt="gradient dark" />
      </picture>

      <div className="container">
        <div className="mx-auto max-w-2xl pt-24 text-center">
          <h1 className="mb-10 font-display text-5xl capitalize text-jacarta-700 dark:text-white lg:text-6xl xl:text-7xl">
            The news revival
            <span className="animate-gradient"> Wotions</span>
          </h1>
          {/* <!-- Search --> */}
          {/* TODO: Useless searchbar */}
          <form action="search" className="relative mb-4">
            <input
              type="search"
              className="rounded-2xl text-md w-full border border-jacarta-100 p-4 pl-10 text-jacarta-700 placeholder:text-jacarta-300 focus:ring-accent dark:border-transparent dark:bg-white/[.15] dark:text-white dark:placeholder:text-white"
              placeholder="Search for article or user..."
            />
            <span className="rounded-2xl absolute left-0 top-0 flex h-full w-12 items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="h-4 w-4 fill-jacarta-500 dark:fill-white"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z" />
              </svg>
            </span>
          </form>

          {/* TODO: Get popular searches and redirect */}
          {/* <div className="text-jacarta-500 dark:text-jacarta-300">
            Popular searches
          </div>
          <Link
            href="#"
            className="text-accent hover:text-jacarta-700 dark:hover:text-white"
          >
            cryptopunks,
          </Link>
          <Link
            href="#"
            className="ml-1 text-accent hover:text-jacarta-700 dark:hover:text-white"
          >
            bored ape yacht club,
          </Link>
          <Link
            href="#"
            className="ml-1 text-accent hover:text-jacarta-700 dark:hover:text-white"
          >
            moonbirds
          </Link> */}
        </div>
      </div>
      {/* <!-- end hero --> */}
    </div>
  );
};

export default Hero;
