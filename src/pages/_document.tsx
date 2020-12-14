import Document, { Html, Main, NextScript } from 'next/document';
import dynamic from 'next/dynamic';
import HeadCustom from '../hacks/headCustom';

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
const SpeedCurveScript = dynamic(() =>
  import('../components/SpeedCurveScript').then(mod => mod.SpeedCurveScript),
);

// @ts-ignore
const VWOScript = dynamic(() =>
  import('../components/VWOScript').then(mod => mod.VWOScript),
);

const env = process?.env?.ENV || '';

// GTM environments.
const gtmEnvs = ['uat'];

// VWO environments.
const vwoEnvs = ['uat'];

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <HeadCustom>
          {/* <RollbarScript /> */}
          {gtmEnvs.includes(env) && <GTMDataLayerScript />}
          {gtmEnvs.includes(env) && <GTMScript />}
          {vwoEnvs.includes(env) && <SpeedCurveScript />}
        </HeadCustom>
        <body>
          <Main />
          <NextScript />
          <script
            defer
            src="//cdn.embedly.com/widgets/platform.js"
            charSet="UTF-8"
          />
          <script defer src="https://cdn.blueconic.net/vanarama.js" />
          <script defer src="https://www.riddle.com/files/js/embed.js" />
          <VWOScript />

          <script
            src="https://cdn.speedcurve.com/js/lux.js?id=661614667"
            async
            defer
            crossOrigin="anonymous"
          />
          {gtmEnvs.includes(env) && <GTMBody />}
        </body>
      </Html>
    );
  }
}
export default MyDocument;
