import { Provider } from 'react-redux';
import App, { AppContext } from 'next/app';
import { NextPageContext } from 'next';
import withRedux from 'next-redux-wrapper';
import { Store } from 'redux';
import { initStore } from 'services/redux/store';
import { Container } from 'react-grid-system';
import { apolloClient } from 'services/apollo/apolloClient';
import { ApolloProvider } from '@apollo/react-hooks';
import '@vanarama/uibook/src/components/base.scss';
import Header from  '@vanarama/uibook/src/components/organisms/Header';
import Footer from  '@vanarama/uibook/src/components/organisms/Footer';
import './_app.css';

interface Props {
  store: Store;
}

interface MyPageContext extends NextPageContext {
  store: Store;
  isServer: boolean;
}

function isDebug() {
  return process.env.NODE_ENV === 'development' ? true : false;
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
        <Container className="container">
          <Provider store={store}>
            <ApolloProvider client={ apolloClient }>
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
