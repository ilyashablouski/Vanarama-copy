import Document, { Html, Head, Main, NextScript } from 'next/document';
import dynamic from 'next/dynamic';

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
const VWOScript = dynamic(() =>
  import('../components/VWO').then(mod => mod.Script),
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
          <script
            async
            src="//cdn.embedly.com/widgets/platform.js"
            charSet="UTF-8"
          />
          <script async src="https://www.riddle.com/files/js/embed.js" />
        </body>
      </Html>
    );
  }
}
export default MyDocument;
