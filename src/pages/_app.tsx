import 'faust.config';
import { FaustProvider } from '@faustjs/next';
import 'normalize.css/normalize.css';
import React, { useEffect } from 'react';
import 'scss/main.scss';
import { client } from 'client';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router'

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const refreshData = () => {
    router.replace(router.asPath);
  }
  useEffect(() => {
     refreshData()
  }, [])
  return (
    <>
      <FaustProvider client={client} pageProps={pageProps}>
        <Component {...pageProps} key={router.asPath}/>
      </FaustProvider>
    </>
  );
}
