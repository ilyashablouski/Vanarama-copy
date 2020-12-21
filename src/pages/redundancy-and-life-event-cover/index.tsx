import dynamic from 'next/dynamic';
import DefaultErrorPage from 'next/error';
import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import Skeleton from '../../components/Skeleton';
import { GENERIC_PAGE, IGenericPage } from '../../gql/genericPage';
import FeaturedAndTilesContainer from '../../containers/FeaturedAndTilesContainer/FeaturedAndTilesContainer';
import createApolloClient from '../../apolloClient';

const Loading = dynamic(() => import('core/atoms/loading'), {
  loading: () => <Skeleton count={1} />,
});

const RedundancyAndLifeEventCoverPage: NextPage<IGenericPage> = ({
  data,
  error,
  loading,
}) => {
  if (error || !data?.genericPage) {
    return <DefaultErrorPage statusCode={404} />;
  }

  if (loading) {
    return <Loading size="large" />;
  }

  return <FeaturedAndTilesContainer data={data} />;
};

export async function getStaticProps(context: GetStaticPropsContext) {
  try {
    const client = createApolloClient({}, context as NextPageContext);

    const { data, errors } = await client.query({
      query: GENERIC_PAGE,
      variables: {
        slug: 'redundancy-and-life-event-cover',
      },
    });
    return {
      props: {
        data,
        error: errors ? errors[0] : null,
      },
    };
  } catch {
    return {
      props: {
        error: true,
      },
    };
  }
}

export default RedundancyAndLifeEventCoverPage;
