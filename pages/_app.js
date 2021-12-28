import '../styles/globals.scss';
import '../styles/homeGrid.scss';
import '../styles/banner.scss';
import '../styles/galary.scss';
import '../styles/detail.scss';



import { Provider } from 'next-auth/client';
// import { UserProvider } from '@auth0/nextjs-auth0';
// import type { AppProps } from 'next/app'
import { Router } from 'next/router';
import Nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import 'toastify-js/src/toastify.css';
//  import 'react-toastify/dist/ReactToastify.css';

Nprogress.configure({ showSpinner: false });

Router.events.on('routeChangeStart', () => {
  Nprogress.start();
});
Router.events.on('routeChangeComplete', () => {
  Nprogress.done();
});
Router.events.on('routeChangeError', () => {
  Nprogress.done();
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <Provider session={session}>
      <Component {...pageProps} />
    </Provider>
  );
}
