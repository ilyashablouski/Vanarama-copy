import { NextPage } from 'next';
import { getDataFromTree } from '@apollo/react-ssr';
import withApollo from '../../hocs/withApollo';

const ContactUsPage: NextPage = () => <div />;

export default withApollo(ContactUsPage, { getDataFromTree });
