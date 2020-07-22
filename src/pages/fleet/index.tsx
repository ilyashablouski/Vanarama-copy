import { NextPage } from 'next';
import { getDataFromTree } from '@apollo/react-ssr';
import withApollo from '../../hocs/withApollo';
import FleetLandingPage from 'components/FleetLandingPage';

const Page: NextPage<{}> = () => {
    return <FleetLandingPage />;
};
// FleetPage.getInitialProps = ({ query, req }) => {
//   return { query, isServer: !!req };
// };

export default withApollo(Page, { getDataFromTree });