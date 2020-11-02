import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import withApollo from '../../../hocs/withApollo';
import LeasingExplainedContainer from '../../../containers/LeasingExplainedContainer/LeasingExplainedContainer';
import { GENERIC_PAGE, IGenericPage } from '../../../gql/genericPage';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';
import { getSectionsData } from '../../../utils/getSectionsData';
import createApolloClient from '../../../apolloClient';

const FinanceInfo: NextPage<IGenericPage> = ({ data, loading, error }) => {
  if (loading) {
    return <Loading size="large" />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  if (!data?.genericPage) {
    return null;
  }

  const title = getSectionsData(['metaData', 'name'], data?.genericPage);
  const sections = getSectionsData(['sections'], data?.genericPage);
  const body = getSectionsData(['body'], data?.genericPage);

  return (
    <LeasingExplainedContainer body={body} title={title} sections={sections} />
  );
};

export async function getStaticProps(context: GetStaticPropsContext) {
  const client = createApolloClient({}, context as NextPageContext);
  const { data, loading, errors } = await client.query({
    query: GENERIC_PAGE,
    variables: {
      slug: `guides/car-leasing-explained`,
    },
  });
  return {
    props: {
      data,
      loading,
      error: errors ? errors[0] : null,
    },
  };
}

export default withApollo(FinanceInfo);
