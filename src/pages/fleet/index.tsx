import { NextPage } from 'next';
import { getDataFromTree } from '@apollo/react-ssr';
import withApollo from '../../hocs/withApollo';
import FleetLandingPage from '../../containers/FleetPageContainer';

const Page: NextPage<{}> = () => {
  return <FleetLandingPage />;
};

export default withApollo(Page, { getDataFromTree });
