import { NextPage } from 'next';
import { getDataFromTree } from '@apollo/react-ssr';
import AboutUs from '../../containers/AboutUsPageContainer/AboutUs';
import withApollo from '../../hocs/withApollo';

const AboutUsLandingPage: NextPage = () => <AboutUs />;

export default withApollo(AboutUsLandingPage, { getDataFromTree });
