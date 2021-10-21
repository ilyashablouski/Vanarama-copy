import Document, { Html, Main, Head } from 'next/document';
import dynamic from 'next/dynamic';

import React from 'react';

import {
  Script as GTMScript,
  Body as GTMBody,
  DataLayer as GTMDataLayerScript,
} from '../components/GTM';
import { VWOScript } from '../components/VWOScript';
import { CookieBarScript } from '../components/CookieBarScript';
import Inline from '../components/Style/Inline';
import { Env } from '../utils/env';

// @ts-ignore
const NextScript = dynamic(() =>
  import('next/document').then(mod => mod.NextScript),
);

// @ts-ignore
const RollbarScript = dynamic(() =>
  import('../components/Rollbar').then(mod => mod.Script),
);

// @ts-ignore
// const SpeedCurveScript = dynamic(() =>
//   import('../components/SpeedCurveScript').then(mod => mod.SpeedCurveScript),
// );

const env: any = process?.env?.ENV || '';
const isLocalEnv = process?.env?.LOCAL === 'true';

// Script environments
const scriptEnvs = {
  gtm: [Env.UAT, Env.PRE_PROD, Env.PROD],
  blueconic: [Env.PRE_PROD, Env.PROD],
  vwo: [Env.PRE_PROD, Env.PROD],
};

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://cdn.blueconic.net" />
          <link rel="preconnect" href="https://plugins.blueconic.net" />
          <link rel="preconnect" href="https://vanarama.blueconic.net" />
          {scriptEnvs.blueconic.includes(env) && (
            <>
              <script
                async
                data-cfasync="false"
                src="https://g562.vanarama.com/script.js"
              />
              <CookieBarScript />
            </>
          )}
          {!isLocalEnv && <RollbarScript />}
          {/* <link rel="preload" href="/styles/base.css" as="style" />
          <link rel="stylesheet" href="/styles/base.css" /> */}
          <Inline />
        </Head>
        <body>
          <Main />
          {scriptEnvs.gtm.includes(env) && <GTMDataLayerScript />}
          <NextScript />
          {scriptEnvs.vwo.includes(env) && <VWOScript />}
          <script async data-cfasync="false" src="/scripts/global.js" />
          {scriptEnvs.gtm.includes(env) && (
            <>
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
