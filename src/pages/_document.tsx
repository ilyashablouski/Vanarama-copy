import Document, { Html, Main, NextScript } from 'next/document';
import dynamic from 'next/dynamic';
import HeadCustom from '../hacks/headCustom';
import { query } from '../hooks/useSetOpenMenu';

// @ts-ignore
// const RollbarScript = dynamic(() =>
//   import('../components/Rollbar').then(mod => mod.Script),
// );

// @ts-ignore
const GTMScript = dynamic(() =>
  import('../components/GTM').then(mod => mod.Script),
);
// @ts-ignore
const GTMBody = dynamic(() =>
  import('../components/GTM').then(mod => mod.Body),
);
// @ts-ignore
const GTMDataLayerScript = dynamic(() =>
  import('../components/GTM').then(mod => mod.DataLayer),
);

// @ts-ignore
// const SpeedCurveScript = dynamic(() =>
//   import('../components/SpeedCurveScript').then(mod => mod.SpeedCurveScript),
// );

const env = process?.env?.ENV || '';

// GTM environments.
const gtmEnvs = ['uat'];

// VWO environments.
// const vwoEnvs = ['uat'];

class MyDocument extends Document {
  state = {
    isOpen: null,
  };

  componentDidUpdate() {
    this.handleCacheRead();
  }

  handleCacheRead = () => {
    try {
      const res = this.context.client.readQuery({ query });
      this.setState({ isOpen: res.menuOpen });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  };

  render() {
    return (
      <Html lang="en">
        <HeadCustom>
          {/* <RollbarScript /> */}
          {gtmEnvs.includes(env) && <GTMDataLayerScript />}
          {gtmEnvs.includes(env) && <GTMScript />}
        </HeadCustom>
        <body className={this.state.isOpen ? '-lock' : ''}>
          <Main />
          <NextScript />
          <script
            defer
            src="//cdn.embedly.com/widgets/platform.js"
            charSet="UTF-8"
          />
          {/* <script defer src="https://cdn.blueconic.net/vanarama.js" /> */}
          <script defer src="https://www.riddle.com/files/js/embed.js" />
          {gtmEnvs.includes(env) && <GTMBody />}
        </body>
      </Html>
    );
  }
}
export default MyDocument;
