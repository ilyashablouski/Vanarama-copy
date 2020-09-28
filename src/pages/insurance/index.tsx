import { NextPage } from 'next';
import { getDataFromTree } from '@apollo/react-ssr';
import InsurancePageContainer from '../../containers/InsurancePageContainer/InsurancePageContainer';
import withApollo from '../../hocs/withApollo';

const Page: NextPage = () => {
  return <InsurancePageContainer />;
};

export default withApollo(Page, { getDataFromTree });
