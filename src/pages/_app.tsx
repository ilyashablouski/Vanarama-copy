import '@vanarama/uibook/packages/ui-components/src/components/base.scss';
import Footer from '@vanarama/uibook/packages/ui-components/src/components/organisms/footer';
import Header from '@vanarama/uibook/packages/ui-components/src/components/organisms/header';
import { AppProps } from 'next/app';

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <main>
      <Header
        topBarLinks={[
          {
            label: 'Login',
            href: `/account/login-register?redirect=${router.pathname}`,
          },
        ]}
      />
      <Component {...pageProps} />
      <Footer
        emailAddress="enquiries@vanarama.co.uk"
        phoneNumber="01442 838 195"
      />
    </main>
  );
}

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
