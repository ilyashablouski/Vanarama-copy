import Document, { Html, Main } from 'next/document';
import dynamic from 'next/dynamic';
import HeadCustom from '../hacks/headCustom';
// import Inline from '../components/Style/Inlne';

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

// Script environments
const scriptEnvs = {
  gtm: ['uat', 'pre-prod', 'prod'],

  blueconic: ['uat', 'pre-prod', 'prod'],

  // vwo: ['uat', 'pre-prod', 'prod'],
};

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <HeadCustom>
          {scriptEnvs.blueconic.includes(env) && (
            <script defer src="https://cdn.blueconic.net/vanarama.js" />
          )}
          {scriptEnvs.gtm.includes(env) && <GTMDataLayerScript />}
          {scriptEnvs.gtm.includes(env) && <GTMScript />}
          {/* <RollbarScript /> */}
          {/* <Inline /> */}
          <link rel="preload" href="/styles/base.css" as="style" />
          <link rel="preload" href="/styles/deferred.css" as="style" />
          <link rel="stylesheet" href="/styles/base.css" />
        </HeadCustom>
        <body>
          <Main />
          <NextScript />
          {scriptEnvs.gtm.includes(env) && <GTMBody />}
          <JS />
        </body>
      </Html>
    );
  }
}
export default MyDocument;
