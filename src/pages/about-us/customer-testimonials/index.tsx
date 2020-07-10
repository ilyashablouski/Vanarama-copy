import { NextPage } from 'next';
import { getDataFromTree } from '@apollo/react-ssr';
import withApollo from '../../../hocs/withApollo';

export const CustomerTestimonialPage: NextPage = () => {
  return <div />;
};

export default withApollo(CustomerTestimonialPage, { getDataFromTree });
