import Document, { Html, Main } from 'next/document';
import dynamic from 'next/dynamic';
import HeadCustom from '../hacks/headCustom';

// @ts-ignore
const NextScript = dynamic(() =>
  import('next/document').then(mod => mod.NextScript),
);

// @ts-ignore
// const RollbarScript = dynamic(() =>
//   import('../components/Rollbar').then(mod => mod.Script),
// );

const JS = dynamic(() => import('../components/JS'));
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
const gtmEnvs = ['uat', 'pre-prod', 'prod'];

// BlueConic environments.
const bcEnvs = ['uat', 'pre-prod', 'prod'];

// VWO environments.
// const vwoEnvs = ['uat', 'pre-prod', 'prod'];

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <HeadCustom>
          {bcEnvs.includes(env) && (
            <script defer src="https://cdn.blueconic.net/vanarama.js" />
          )}
          {gtmEnvs.includes(env) && <GTMDataLayerScript />}
          {gtmEnvs.includes(env) && <GTMScript />}
          {/* <RollbarScript /> */}
          <link rel="stylesheet" href="/styles/base.css" />
          <link rel="preload" href="/styles/deferred.css" as="style" />
        </HeadCustom>
        <body>
          <Main />
          <NextScript />
          {gtmEnvs.includes(env) && <GTMBody />}
          <JS />
        </body>
      </Html>
    );
  }
}
export default MyDocument;
