import Document, { Html, Main } from 'next/document';
import dynamic from 'next/dynamic';
import HeadCustom from '../hacks/headCustom';

// @ts-ignore
// const RollbarScript = dynamic(() =>
//   import('../components/Rollbar').then(mod => mod.Script),
// );

// @ts-ignore
const NextScript = dynamic(() =>
  import('next/document').then(mod => mod.NextScript),
);

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

// @ts-ignore
const SpeedCurveScript = dynamic(() =>
  import('../components/SpeedCurve').then(mod => mod.Script),
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
        <HeadCustom>{/* <RollbarScript /> */}</HeadCustom>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
export default MyDocument;
