import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      {/* <Head>
      <meta
        name="description"
        content="Google Docs Clone created using React.JS"
      />
      <meta
        name="keywords"
        content="Google, Docs, Google Docs, Text Editor, Clone"
      />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Google Docs Clone" />
      <meta property="og:url" content="http://localhost:3000" />
      <meta property="og:image" content="/images/banner.png" />
      <meta
        property="og:description"
        content="Google Docs Clone created using React.JS"
      />
      <meta property="og:site_name" content="http://localhost:3000" />
      <link rel="icon" href="/icons/favicon.ico" />
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      />
    </Head> */}
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
