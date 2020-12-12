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
