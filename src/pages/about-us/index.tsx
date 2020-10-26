import { NextPage, NextPageContext } from 'next';
import { GET_ABOUT_US_PAGE_DATA } from '../../containers/AboutUsPageContainer/gql';
import AboutUs, {
  IAboutPageProps,
} from '../../containers/AboutUsPageContainer/AboutUs';
import createApolloClient from '../../apolloClient';

const AboutUsLandingPage: NextPage<IAboutPageProps> = ({
  data,
  loading,
  error,
}) => <AboutUs data={data} loading={loading} error={error} />;

export async function getStaticProps(context: NextPageContext) {
  const client = createApolloClient({}, context);
  const { data, loading, errors } = await client.query({
    query: GET_ABOUT_US_PAGE_DATA,
  });
  return { props: { data, loading, error: errors || null } };
}

export default AboutUsLandingPage;
