import { ApolloProvider } from '@apollo/react-hooks';
import '@vanarama/uibook/src/components/base.scss';
import Footer from '@vanarama/uibook/src/components/organisms/Footer';
import Header from '@vanarama/uibook/src/components/organisms/Header';
import withRedux from 'next-redux-wrapper';
import App, { AppContext } from 'next/app';
import { Container } from 'react-grid-system';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { apolloClient } from 'services/apollo/apolloClient';
import { initStore } from 'services/redux/store';

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
