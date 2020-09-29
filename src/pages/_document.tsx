import Document, { Html, Head, Main, NextScript } from 'next/document';

import {
  Script as GTMScript,
  Body as GTMBody,
  DataLayer as GTMDataLayerScript,
} from '../components/GTM';
import { Script as VWOScript } from '../components/VWO';
// import { Script as RollbarScript } from '../components/Rollbar';

const env = process?.env?.ENV || '';

// GTM environments.
const gtmEnvs = ['dev', 'uat', 'production'];

// VWO environments.
const vwoEnvs = ['uat', 'production'];

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* <RollbarScript /> */}
          {gtmEnvs.includes(env) && <GTMDataLayerScript />}
          {gtmEnvs.includes(env) && <GTMScript />}
          {vwoEnvs.includes(env) && <VWOScript />}
        </Head>
        <body>
          {gtmEnvs.includes(env) && <GTMBody />}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
export default MyDocument;
