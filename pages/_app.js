import Head from 'next/head';
import Script from 'next/script';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '../styles/globals.scss';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Head>
          <title>{process.env.APP_TITLE}</title>
          <link rel="icon" href="/favicon.ico?imageFilter=convert&f=png&w=32" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
          <meta name="theme-color" content="#4F6AF5" />
        </Head>
        <Script src="__blocklet__.js" />
        <Component {...pageProps} />
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
