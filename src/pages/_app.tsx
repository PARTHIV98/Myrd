import 'faust.config';
import { FaustProvider } from '@faustjs/next';
import 'normalize.css/normalize.css';
import React from 'react';
import 'scss/main.scss';
import { client } from 'client';
import type { AppProps } from 'next/app';
import { AppContext, AppInitialProps, AppLayoutProps } from 'next/app';
import type { NextComponentType } from 'next';
import { ReactNode } from 'react';
import Page from 'pages';


// const MyApp: NextComponentType<AppContext, AppInitialProps, AppLayoutProps> = ({
//   Component,
//   pageProps,
// }: AppLayoutProps) => {
//   const getLayout = Component.getLayout || ((page: ReactNode) => page);
//   return getLayout(
//     <>
//     <FaustProvider client={client} pageProps={pageProps}><Component {...pageProps} /></FaustProvider>
//     </>);
// };

// export default MyApp;
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <FaustProvider client={client} pageProps={pageProps}>
        <Component {...pageProps} />
      </FaustProvider>
    </>
  );
}
