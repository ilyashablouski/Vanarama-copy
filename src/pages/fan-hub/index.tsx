import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import dynamic from 'next/dynamic';
import { GENERIC_PAGE, IGenericPage } from '../../gql/genericPage';
import Skeleton from '../../components/Skeleton';
import createApolloClient from '../../apolloClient';

const FeaturedAndTilesContainer = dynamic(
  () =>
    import(
      '../../containers/FeaturedAndTilesContainer/FeaturedAndTilesContainer'
    ),
  {
    loading: () => <Skeleton count={1} />,
    ssr: false,
  },
);

const FanHub: NextPage<IGenericPage> = ({ data }) => (
  <FeaturedAndTilesContainer data={data} />
);

export async function getStaticProps(context: GetStaticPropsContext) {
  try {
    const client = createApolloClient({}, context as NextPageContext);

    const { data, errors } = await client.query({
      query: GENERIC_PAGE,
      variables: {
        slug: 'fan-hub',
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

export default FanHub;
