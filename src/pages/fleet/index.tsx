import { NextPage } from 'next';
import { getDataFromTree } from '@apollo/react-ssr';
import FleetLandingPage from 'components/FleetLandingPage';
import withApollo from '../../hocs/withApollo';

const Page: NextPage<{}> = () => {
  return <FleetLandingPage />;
};
// FleetPage.getInitialProps = ({ query, req }) => {
//   return { query, isServer: !!req };
// };

export default withApollo(Page, { getDataFromTree });
