import { NextPage } from 'next';
import { getDataFromTree } from '@apollo/react-ssr';
import AboutUs from './AboutUs';
import withApollo from '../../hocs/withApollo';

const AboutUsLandingPage: NextPage = () => <AboutUs />;

export default withApollo(AboutUsLandingPage, { getDataFromTree });
