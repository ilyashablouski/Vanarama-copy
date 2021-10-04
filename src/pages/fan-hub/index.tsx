import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import dynamic from 'next/dynamic';
import { GENERIC_PAGE, IGenericPage } from '../../gql/genericPage';
import Skeleton from '../../components/Skeleton';
import createApolloClient from '../../apolloClient';
import { GenericPageQuery } from '../../../generated/GenericPageQuery';

const FeaturedAndTilesContainer = dynamic(
  () =>
    import(
      '../../containers/FeaturedAndTilesContainer/FeaturedAndTilesContainer'
    ),
  {
    loading: () => <Skeleton count={1} />,
  },
);

const FanHub: NextPage<IGenericPage> = ({ data }) => (
  <FeaturedAndTilesContainer data={data} />
);

export async function getStaticProps(context: GetStaticPropsContext) {
  try {
    const client = createApolloClient({}, context as NextPageContext);

    const { data, errors } = await client.query<GenericPageQuery>({
      query: GENERIC_PAGE,
      variables: {
        slug: 'fan-hub',
        ...(context?.preview && { isPreview: context?.preview }),
      },
    });
    if (errors) {
      throw new Error(errors[0].message);
    }
    return {
      revalidate: context?.preview
        ? 1
        : Number(process.env.REVALIDATE_INTERVAL),
      props: {
        data,
      },
    };
  } catch (err) {
    throw new Error(err);
  }
}

export default FanHub;
