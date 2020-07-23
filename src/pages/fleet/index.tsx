import { NextPage } from 'next';
import { getDataFromTree } from '@apollo/react-ssr';
import FleetLandingPage from '../../components/FleetLandingPage';
import withApollo from '../../hocs/withApollo';

const Page: NextPage<{}> = () => {
  return <FleetLandingPage />;
};

export default withApollo(Page, { getDataFromTree });
