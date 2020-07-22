import { NextPage } from 'next';
import { getDataFromTree } from '@apollo/react-ssr';
import withApollo from '../../hocs/withApollo';
import SearchPageContainer from '../../containers/SearchPageContainer';

const FleetRequestCallBack: NextPage<{}> = () => {
  return <div>fleeeeeeeeeeeeeeeeeeeet</div>;
};
// FleetPage.getInitialProps = ({ query, req }) => {
//   return { query, isServer: !!req };
// };

export default withApollo(FleetRequestCallBack, { getDataFromTree });