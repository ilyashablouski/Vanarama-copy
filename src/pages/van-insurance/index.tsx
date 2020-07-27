import { NextPage } from 'next';
import { getDataFromTree } from '@apollo/react-ssr';
import withApollo from '../../hocs/withApollo';

const Page: NextPage = () => {
    return <></>;
};

export default withApollo(Page, { getDataFromTree });
