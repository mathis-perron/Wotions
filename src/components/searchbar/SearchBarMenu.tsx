import { SearchIcon } from '../icons/SearchIcon';

interface SearchBarMenuProps {}

const SearchBarMenu: React.FC<SearchBarMenuProps> = () => {
  return (
    <form action="search" className="relative mt-24 mb-8 w-full lg:hidden">
      <input
        type="search"
        className="rounded-2xl w-full border border-jacarta-100 py-3 px-4 pl-10 text-jacarta-700 placeholder:text-jacarta-500 focus:ring-accent dark:border-transparent dark:bg-white/[.15] dark:text-white dark:placeholder:text-white"
        placeholder="Search"
      />
      <span className="rounded-2xl absolute left-0 top-0 flex h-full w-12 items-center justify-center">
        <SearchIcon className="h-4 w-4 fill-jacarta-500 dark:fill-white" />
      </span>
    </form>
  );
};

export default SearchBarMenu;
