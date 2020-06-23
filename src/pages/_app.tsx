import { ToastContainer } from '@vanarama/uibook/lib/components/atoms/toast/Toast';
import Footer from '@vanarama/uibook/lib/components/organisms/footer';
import '@vanarama/uibook/src/components/base.scss';
import { AppProps } from 'next/app';
import { Router } from 'next/router';
import { useEffect } from 'react';
import Header from '../components/Header/Header';
import { PHONE_NUMBER_LINK, TOP_BAR_LINKS } from '../models/enum/HeaderLinks';

const MyApp: React.FC<AppProps> = ({ Component, pageProps, router }) => {
  const LOGIN_LINK = {
    label: 'Login',
    href: `/account/login-register?redirect=${router.asPath}`,
  };

  useEffect(() => {
    // Anytime router.push is called, scroll to the top of the page.
    Router.events.on('routeChangeComplete', () => {
      window.scrollTo(0, 0);
    });
  }, []);

  const isCarPage = router.pathname === '/cars/car-details';

  return (
    <>
      <ToastContainer />
      <main className={isCarPage ? 'page:pdp' : 'page:default'}>
        <Header
          loginLink={LOGIN_LINK}
          phoneNumberLink={PHONE_NUMBER_LINK}
          topBarLinks={TOP_BAR_LINKS}
        />
        <Component {...pageProps} />
        <Footer
          emailAddress="enquiries@vanarama.co.uk"
          phoneNumber="01442 838 195"
        />
      </main>
    </>
  );
};

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp;
