import { ApolloProvider } from '@apollo/react-hooks';
import '@vanarama/uibook/src/components/base.scss';
import Footer from '@vanarama/uibook/src/components/organisms/Footer';
import Header from '@vanarama/uibook/src/components/organisms/Header';
import withRedux from 'next-redux-wrapper';
import App, { AppContext } from 'next/app';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { apolloClient } from 'services/apollo/apolloClient';
import { initStore } from 'services/redux/store';

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
    const { Component, pageProps, store } = this.props;
    return (
      <Provider store={store}>
        <ApolloProvider client={apolloClient}>
          <main>
            <Header />
            <Component {...pageProps} />
            <Footer emailAddress="aaa@email.com" phoneNumber="012100000" />
          </main>
        </ApolloProvider>
      </Provider>
    );
  }
}

export default withRedux(initStore, {
  debug: process.env.NODE_ENV === 'development',
})(ReduxApp);
