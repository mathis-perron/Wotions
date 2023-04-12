import Link from 'next/link';

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className=" bg-white dark:bg-jacarta-900">
      <div className="container flex flex-col items-center justify-between space-y-2 py-8 sm:flex-row sm:space-y-0">
        <span className="text-sm dark:text-jacarta-400">
          © {new Date().getFullYear()} Wotions
        </span>

        <ul className="flex flex-wrap space-x-4 text-sm dark:text-jacarta-400">
          <li>
            <Link
              href="/legal/conditions"
              className="hover:text-accent dark:hover:text-white"
            >
              Terms and conditions
            </Link>
          </li>
          <li>
            <Link
              href="/legal/policy"
              className="hover:text-accent dark:hover:text-white"
            >
              Privacy policy
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
