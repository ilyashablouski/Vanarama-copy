import { Provider } from 'react-redux';
import App, { AppContext } from 'next/app';
import withRedux from 'next-redux-wrapper';
import { Store } from 'redux';
import { initStore } from 'redux/store';
import { client } from '../lib/apollo';
import { ApolloProvider } from '@apollo/react-hooks';
import 'antd/dist/antd.css';

interface Props {
  store: Store;
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
      <Provider store={store}>
        <ApolloProvider client={client}>
          <Component {...pageProps} />
        </ApolloProvider>
      </Provider>
    );
  }
}

export default withRedux(initStore, { debug: isDebug() })(ReduxApp);
