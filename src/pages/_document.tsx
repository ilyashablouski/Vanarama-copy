import Document, { Html, Main, Head } from 'next/document';
import dynamic from 'next/dynamic';

import React from 'react';

import { HeapScript } from '../components/HeapScript';
import {
  Script as GTMScript,
  Body as GTMBody,
  DataLayer as GTMDataLayerScript,
} from '../components/GTM';
import { VWOScript } from '../components/VWOScript';
import Inline from '../components/Style/Inline';
import { Env } from '../utils/env';

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

const env: any = process?.env?.ENV || '';

// Script environments
const scriptEnvs = {
  gtm: [Env.UAT, Env.PRE_PROD, Env.PROD],

  blueconic: [Env.UAT, Env.PRE_PROD, Env.PROD],

  vwo: [Env.UAT, Env.PRE_PROD, Env.PROD],

  heap: [Env.DEV, Env.UAT, Env.PRE_PROD, Env.PROD],
};

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://cdn.blueconic.com" />
          {scriptEnvs.blueconic.includes(env) && (
            <script
              async
              data-cfasync="false"
              src="https://cdn.blueconic.net/vanarama.js"
            />
          )}
          {/* <RollbarScript /> */}
          {/* <link rel="preload" href="/styles/base.css" as="style" />
          <link rel="stylesheet" href="/styles/base.css" /> */}
          <Inline />
        </Head>
        <body>
          <Main />
          {scriptEnvs.gtm.includes(env) && <GTMDataLayerScript />}
          <NextScript />
          {scriptEnvs.vwo.includes(env) && <VWOScript />}
          {scriptEnvs.gtm.includes(env) && (
            <>
              <GTMScript />
              <GTMBody />
            </>
          )}
          {scriptEnvs.heap.includes(env) && (
            <HeapScript heapID={process.env.HEAP_ID} />
          )}
        </body>
      </Html>
    );
  }
}
export default MyDocument;
