import { ApolloProvider } from '@apollo/react-hooks';
import '@vanarama/uibook/packages/ui-components/src/components/base.scss';
import Footer from '@vanarama/uibook/packages/ui-components/src/components/organisms/footer';
import Header from '@vanarama/uibook/packages/ui-components/src/components/organisms/header';
import withRedux from 'next-redux-wrapper';
import App, { AppContext } from 'next/app';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { apolloClient } from '../services/apollo/apolloClient';
import initStore from '../services/redux/store';

interface IProps {
  store: Store;
}

class ReduxApp extends App<IProps> {
  static async getInitialProps({ Component, ctx }: AppContext) {
    return {
      pageProps: {
        ...(Component.getInitialProps
          ? await Component.getInitialProps(ctx)
          : {}),
      },
    };
  }

  render() {
    const { Component, pageProps, store, router } = this.props;
    return (
      <Provider store={store}>
        <ApolloProvider client={apolloClient}>
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
        </ApolloProvider>
      </Provider>
    );
  }
}

export default withRedux(initStore, {
  debug: process.env.NODE_ENV === 'development',
})(ReduxApp);
