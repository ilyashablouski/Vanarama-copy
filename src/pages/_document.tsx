import Document, { Html, Main } from 'next/document';
import dynamic from 'next/dynamic';
import HeadCustom from '../hacks/headCustom';
import {
  Script as GTMScript,
  Body as GTMBody,
  DataLayer as GTMDataLayerScript,
} from '../components/GTM';
import Inline from '../components/Style/Inline';

// @ts-ignore
const NextScript = dynamic(() =>
  import('next/document').then(mod => mod.NextScript),
);

// @ts-ignore
// const RollbarScript = dynamic(() =>
//   import('../components/Rollbar').then(mod => mod.Script),
// );

// @ts-ignore
// const SpeedCurveScript = dynamic(() =>
//   import('../components/SpeedCurveScript').then(mod => mod.SpeedCurveScript),
// );

const JS = dynamic(() => import('../components/JS'));

const env = process?.env?.ENV || '';

// Script environments
const scriptEnvs = {
  gtm: ['dev', 'uat', 'pre-prod', 'prod'],

  // blueconic: ['uat', 'pre-prod', 'prod'],

  // vwo: ['uat', 'pre-prod', 'prod'],
};

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <HeadCustom>
          {/* {scriptEnvs.gtm.includes(env) && <GTMDataLayerScript />}
          {scriptEnvs.gtm.includes(env) && <GTMScript />} */}
          {/* <RollbarScript /> */}
          <link rel="preload" href="/styles/deferred.css" as="style" />
          {/* <link rel="preload" href="/styles/base.css" as="style" />
          <link rel="stylesheet" href="/styles/base.css" /> */}
          <Inline />
        </HeadCustom>
        <body>
          <Main />
          <NextScript />
          {scriptEnvs.gtm.includes(env) && (
            <>
              <GTMDataLayerScript />
              <GTMScript />
              <GTMBody />
            </>
          )}
        </body>
      </Html>
    );
  }
}
export default MyDocument;
