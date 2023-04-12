import '@/assets/css/main.css';

import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';

import Layout from '@/components/layout/Layout';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const router = useRouter();
  const pid = router.asPath;

  return (
    <SessionProvider session={session}>
      <ThemeProvider enableSystem={true} attribute="class">
        {pid.includes('/login') || pid.includes('/signup') ? (
          <Component {...pageProps} />
        ) : (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </ThemeProvider>
    </SessionProvider>
  );
}
