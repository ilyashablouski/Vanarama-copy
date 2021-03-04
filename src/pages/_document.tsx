import Document, { Html, Main } from 'next/document';
import dynamic from 'next/dynamic';
import {
  Script as GTMScript,
  Body as GTMBody,
  DataLayer as GTMDataLayerScript,
} from '../components/GTM';
import { VWOScript } from '../components/VWOScript';
import Inline from '../components/Style/Inline';
import HeadCustom from '../hacks/headCustom';

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
          {/* <RollbarScript /> */}
          {/* <link rel="preload" href="/styles/base.css" as="style" />
          <link rel="stylesheet" href="/styles/base.css" /> */}
          {scriptEnvs.blueconic.includes(env) && (
            <script async src="https://cdn.blueconic.net/vanarama.js" />
          )}
          <Inline />
        </HeadCustom>
        <body>
          <Main />
          <NextScript />
          {/* {scriptEnvs.vwo.includes(env) && <VWOScript />} */}
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
