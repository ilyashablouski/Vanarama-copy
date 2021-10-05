import dynamic from 'next/dynamic';
import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import { GENERIC_PAGE, IGenericPage } from '../../gql/genericPage';
import FeaturedAndTilesContainer from '../../containers/FeaturedAndTilesContainer/FeaturedAndTilesContainer';
import createApolloClient from '../../apolloClient';
import Skeleton from '../../components/Skeleton';
import {
  GenericPageQuery,
  GenericPageQueryVariables,
} from '../../../generated/GenericPageQuery';

const Loading = dynamic(() => import('core/atoms/loading'), {
  loading: () => <Skeleton count={1} />,
});

const BlackFriday: NextPage<IGenericPage> = ({ data, loading }) => {
  if (loading) {
    return <Loading size="large" />;
  }

  return <FeaturedAndTilesContainer data={data} />;
};

export async function getStaticProps(context: GetStaticPropsContext) {
  try {
    const client = createApolloClient({}, context as NextPageContext);

    const { data, errors } = await client.query<
      GenericPageQuery,
      GenericPageQueryVariables
    >({
      query: GENERIC_PAGE,
      variables: {
        slug: 'black-friday',
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

export default BlackFriday;
