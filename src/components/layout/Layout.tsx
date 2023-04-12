import type { PropsWithChildren } from 'react';

import Footer from './Footer';
import Header from './Header';

interface LayoutProps {}

const Layout: React.FC<PropsWithChildren & LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
