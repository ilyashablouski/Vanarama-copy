import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import DefaultErrorPage from 'next/error';
import withApollo from '../../../hocs/withApollo';
import LeasingExplainedContainer from '../../../containers/LeasingExplainedContainer/LeasingExplainedContainer';
import { GENERIC_PAGE, IGenericPage } from '../../../gql/genericPage';
import { getSectionsData } from '../../../utils/getSectionsData';
import createApolloClient from '../../../apolloClient';

const FinanceInfo: NextPage<IGenericPage> = ({ data, error }) => {
  if (error || !data?.genericPage) {
    return <DefaultErrorPage statusCode={404} />;
  }

  const title = getSectionsData(['metaData', 'name'], data?.genericPage);
  const sections = getSectionsData(['sections'], data?.genericPage);
  const body = getSectionsData(['body'], data?.genericPage);

  return (
    <LeasingExplainedContainer body={body} title={title} sections={sections} />
  );
};

export async function getStaticProps(context: GetStaticPropsContext) {
  try {
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
  } catch (e) {
    return {
      props: {
        error: true,
      },
    };
  }
}

export default withApollo(FinanceInfo);
