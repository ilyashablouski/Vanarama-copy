import { Provider } from 'react-redux';
import App, { AppContext } from 'next/app';
import { NextPageContext } from 'next';
import withRedux from 'next-redux-wrapper';
import { Store } from 'redux';
import { ApolloProvider } from '@apollo/react-hooks';
import { Container } from 'react-grid-system';
import '@vanarama/uibook/packages/ui-components/src/components/base.scss';
import Header from '@vanarama/uibook/packages/ui-components/src/components/organisms/header';
import Footer from '@vanarama/uibook/packages/ui-components/src/components/organisms/footer';

import { initStore } from '../services/redux/store';
import { apolloClient } from '../services/apollo/apolloClient';

interface Props {
  store: Store;
}

function isDebug() {
  return process.env.NODE_ENV === 'development';
}

class ReduxApp extends App<Props> {
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
    const { Component, pageProps, store } = this.props;
    return (
      <>
        <Header />
        <Container>
          <Provider store={store}>
            <ApolloProvider client={apolloClient}>
              <Component {...pageProps} />
            </ApolloProvider>
          </Provider>
        </Container>
        <Footer emailAddress="aaa@email.com" phoneNumber="012100000" />
      </>
    );
  }
}

export default withRedux(initStore, { debug: isDebug() })(ReduxApp);
