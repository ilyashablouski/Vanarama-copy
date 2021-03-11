// @ts-ignore
// import getConfig from 'next/config';

// const { serverRuntimeConfig } = getConfig();

// const Rollbar = require('rollbar');

// const reportError = (err, req) => {
//   // eslint-disable-next-line no-console
//   console.log('Reporting error to Rollbar...');
//   const rollbar = new Rollbar(serverRuntimeConfig.rollbarServerToken);
//   rollbar.error(err, req, rollbarError => {
//     if (rollbarError) {
//       /* eslint-disable */
//       console.error('Rollbar error reporting failed:');
//       console.error(rollbarError);
//       /* eslint-enable */
//       return;
//     }
//     // eslint-disable-next-line no-console
//     console.log('Reported error to Rollbar');
//   });
// };

const Error = ({ statusCode }) => {
  return (
    <p>
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : 'An error occurred on client'}
    </p>
  );
};

// Error.getInitialProps = ({ req, res, err }) => {
export async function getStaticProps({ res, err }) {
  // eslint-disable-next-line no-nested-ternary
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  // Only require Rollbar and report error if we're on the server

  // Uncomment to enable Rollbar
  // if (!process.browser) reportError(err, req);

  return {
    revalidate: Number(process.env.REVALIDATE_INTERVAL),
    props: { statusCode },
  };
}

export default Error;
