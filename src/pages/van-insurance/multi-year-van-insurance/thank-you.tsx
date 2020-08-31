import { NextPage } from 'next';
import { getDataFromTree } from '@apollo/react-ssr';
import withApollo from '../../../hocs/withApollo';

const ThankYouPage: NextPage = () => {
  return <></>;
};

export default withApollo(ThankYouPage, { getDataFromTree });
