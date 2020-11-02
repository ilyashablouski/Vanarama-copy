import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import DefaultErrorPage from 'next/error';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import withApollo from '../../../../hocs/withApollo';
import FinanceInformationExplainedContainer from '../../../../containers/FinanceInformationExplainedContainer/FinanceInfromationExplainedContainer';
import { GENERIC_PAGE, IGenericPage } from '../../../../gql/genericPage';
import { getSectionsData } from '../../../../utils/getSectionsData';
import createApolloClient from '../../../../apolloClient';

const FinanceInfo: NextPage<IGenericPage> = ({ data, loading, error }) => {

  if (error || !data?.genericPage) {
    return <DefaultErrorPage statusCode={404} />;
  }

  const title = getSectionsData(['metaData', 'name'], data?.genericPage);
  const sections = getSectionsData(['sections'], data?.genericPage);

  return (
    <FinanceInformationExplainedContainer title={title} sections={sections} />
  );
};

export async function getStaticPaths() {
  return {
    paths: [
      { params: { page: 'business-contract-hire' } },
      { params: { page: 'personal-contract-hire' } },
    ],
    fallback: false,
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  try {
    const client = createApolloClient({}, context as NextPageContext);
    const { data, loading, errors } = await client.query({
      query: GENERIC_PAGE,
      variables: {
        slug: `lease-finance/cars/${context?.params?.page}`,
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
