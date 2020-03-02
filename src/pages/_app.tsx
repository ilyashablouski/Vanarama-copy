import { Provider } from 'react-redux';
import App, { AppContext } from 'next/app';
import withRedux from 'next-redux-wrapper';
import { Store } from 'redux';
import { initStore } from 'services/redux/store';
import { Container } from 'react-grid-system';
import { client } from '../services/apollo/apollo';
import { ApolloProvider } from '@apollo/react-hooks';
import Header from  '@vanarama/uibook/packages/ui-components/src/css/organisms/Header';
import Footer from  '@vanarama/uibook/packages/ui-components/src/css/organisms/Footer';
import '@vanarama/uibook/packages/ui-components/src/css/App.css';
import './_app.css';

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
      <>
        <Header />
        <Container className="container">
          <Provider store={store}>
            <ApolloProvider client={client}>
              <Component {...pageProps} />
            </ApolloProvider>
          </Provider>
        </Container>
        {/* <Footer /> */}
      </>
    );
  }
}

export default withRedux(initStore, { debug: isDebug() })(ReduxApp);
