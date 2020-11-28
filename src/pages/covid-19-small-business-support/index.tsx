import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import { GENERIC_PAGE, IGenericPage } from '../../gql/genericPage';
import SimplePageContainer from '../../containers/SimplePageContainer/SimplePageContainer';
import createApolloClient from '../../apolloClient';

const Covid19Page: NextPage<IGenericPage> = ({ data, loading, error }) => (
  <SimplePageContainer data={data} loading={loading} error={error} />
);

export async function getStaticProps(context: GetStaticPropsContext) {
  try {
    const client = createApolloClient({}, context as NextPageContext);

    const { data, errors } = await client.query({
      query: GENERIC_PAGE,
      variables: {
        slug: 'covid-19-small-business-support',
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

export default Covid19Page;
