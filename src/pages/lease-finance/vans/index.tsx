import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import DefaultErrorPage from 'next/error';
import withApollo from '../../../hocs/withApollo';
import FinanceExplainedContainer from '../../../containers/FinanceExplainedContainer/FinanceExplainedContainer';
import { GENERIC_PAGE, IGenericPage } from '../../../gql/genericPage';
import createApolloClient from '../../../apolloClient';

const EligibilityChecker: NextPage<IGenericPage> = ({ data, error }) => {
  if (error || !data?.genericPage) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return <FinanceExplainedContainer data={data} />;
};

export async function getStaticProps(context: GetStaticPropsContext) {
  try {
    const client = createApolloClient({}, context as NextPageContext);
    const { data, loading, errors } = await client.query({
      query: GENERIC_PAGE,
      variables: {
        slug: `lease-finance/vans`,
      },
    });
    return {
      props: {
        data,
        loading,
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

export default withApollo(EligibilityChecker);
