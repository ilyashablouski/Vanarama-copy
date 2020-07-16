import { NextPage } from "next";
import AboutUs from "components/AboutUs";
import withApollo from '../../hocs/withApollo';
import { getDataFromTree } from '@apollo/react-ssr';

const AboutUsLandingPage: NextPage = () => <AboutUs />;

export default withApollo(AboutUsLandingPage, { getDataFromTree });