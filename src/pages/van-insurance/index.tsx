import { NextPage } from 'next';
import { getDataFromTree } from '@apollo/react-ssr';
import withApollo from '../../hocs/withApollo';
import InsurancePageContainer from 'containers/InsurancePageContainer/InsurancePageContainer';

const Page: NextPage = () => {
    return <InsurancePageContainer />;
};

export default withApollo(Page, { getDataFromTree });
