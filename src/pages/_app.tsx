import { Provider } from "react-redux"
import App, { AppContext } from "next/app"
import withRedux from "next-redux-wrapper"
import { Store } from "redux"
import { initStore } from "redux/store"

interface Props {
  store: Store
}

function isDebug() {
  return process.env.NODE_ENV === "development" ? true : false
}

class ReduxApp extends App<Props> {
  static async getInitialProps({ Component, ctx }: AppContext) {
    return {
      pageProps: {
        ...(Component.getInitialProps
          ? await Component.getInitialProps(ctx)
          : {}),
      },
    }
  }

  render() {
    const { Component, pageProps, store } = this.props
    return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    )
  }
}

export default withRedux(initStore, { debug: isDebug() })(ReduxApp)
 